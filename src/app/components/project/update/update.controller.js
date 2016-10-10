;(function() {
    'use strict';

    angular
        .module('project-update')
        .controller('UpdateController', UpdateController);

    /* ngInject */
    function UpdateController($scope, $state, $stateParams, updateProjectService, accountService,
        PROJ_STATUSES, Assert, Type, Upload, API_URL, dialogService) {
        $scope.isAdmin = accountService.isAdmin();
        /** @public {String} */
        $scope.projectId = $stateParams.id;
        /** @public {Array<Object>} */
        $scope.statuses = PROJ_STATUSES;
        /** @public {Object} */
        $scope.project = {}

        $scope._init = _init; 
        $scope.update = update;
        $scope.confirmRemove = confirmRemove;
        $scope._removeResearcher = _removeResearcher;
        $scope.onFileSelect = onFileSelect;
        $scope.changeSupervisor = changeSupervisor;
        $scope.addResearcher = addResearcher;


        function _init() {

            updateProjectService.getProjectById($scope.projectId).then(function(res) {
                $scope.project = res.data;
            }, function(err) {
                console.log(err);
            });
        };

        /**
         * @param {Boolean} valid
         * @param {Object} e
         */
        function update(valid, e) {
            e.preventDefault();

            if(!valid) {
                return;
            }

            var params = {
                researchId: $scope.project.id,
                title: $scope.project.title,
                image_url: $scope.project.image_url,
                status: $scope.project.status,
                description: {
                    brief: $scope.project.description.brief,
                    detailed: $scope.project.description.detailed
                }
            };

            updateProjectService.update(params)
                .then(function(res) {
                    $state.go('project', {id: $scope.project.id});
                }, function(err) {
                    console.log(err);
                });
        };

        /**
         * @param {Object} user
         * @param {Object} ev
         */
        function confirmRemove (user, ev) {
            var title = 'Remove ' + user.name + ' from the research?';
            var message = '';
            var button = 'DELETE USER';
            var callback = $scope._removeResearcher;

            dialogService.confirm(title, message, button, callback, ev, user);
        }

        /**
         * @param {Object} researcher
         */
        function _removeResearcher(researcher) {
            var params = {
                researchId: $scope.project.id,
                researcherId: researcher.id
            };

            updateProjectService.removeResearcher(params)
                .then(function(res) {
                    _.remove($scope.project.researchers, function(person) {
                        return person.id === researcher.id;
                    });
                }, function(err) {
                    console.log(err);
                });
        };

        /**
         * @param {Object} event
         */
        function onFileSelect(event) {
            Assert.isObject(event, 'Invalid "event" type');

            var image = event.target.files[0];
            
            if (image.type !== 'image/png' && image.type !== 'image/jpeg') {
                alert('Only PNG and JPEG are accepted.');
                return;
            }

            $scope.upload = Upload.upload({
                url: API_URL + 'upload',
                method: 'POST',
                file: image
            }).success(function(data, status, headers, config) {
                $scope.project.image_url = data.url;
            }).error(function(err) {

            });
        };

        /**
         * @param {String} email
         * @param {Object} e
         */
        function changeSupervisor (email, e) {
            var params = {
                researchId: $scope.projectId,
                new_supervisor: email
            }
            updateProjectService.changeSupervisor(params)
                .then(function() {
                    $state.go('project', {id: $scope.projectId});
                }, function(err) {
                    console.log(err);
                });
        };

        /**
         * @param {String} email
         * @param {Object} e
         */
        function addResearcher (email, e) {
            var params = {
                researchId: $scope.projectId,
                new_researcher: email
            }
            updateProjectService.addResearcher(params)
                .then(function() {
                    $scope._init();
                }, function(err) {
                    console.log(err);
                });
        }

        $scope._init();
    };
})();