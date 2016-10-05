;(function() {
    'use strict';

    angular
        .module('project-update')
        .controller('UpdateController', UpdateController);

    /* ngInject */
    function UpdateController($scope, $state, UpdateResolver, projectsService,
        PROJ_STATUSES, Assert, Type, Upload, API_URL) {
        /** @public {Object} */
        $scope.project = UpdateResolver.data;
        /** @public {Array<Object>} */
        $scope.statuses = PROJ_STATUSES;

        $scope.update = update;
        $scope.removeResearcher = removeResearcher;
        $scope.onFileSelect = onFileSelect;

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

            projectsService.update(params)
                .then(function(res) {
                    $state.go('project.about', {id: $scope.project.id});
                }, function(err) {
                    console.log(err);
                });
        };

        /**
         * @param {Object} researcher
         */
        function removeResearcher(researcher) {
            var params = {
                researchId: $scope.project.id,
                researcherId: researcher.id
            };
            return;

            projectsService.removeResearcher(params)
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
    };
})();