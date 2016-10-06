;(function() {
    'use strict';

    angular
        .module('add')
        .controller('AddController', AddController);

    /* ngInject */
    function AddController($scope, $state, API_URL, addService, Upload, Assert, Type, errorService) {
        /** @public {Object} */
        $scope.project = {
            description: {},
            tags: []
        };
        $scope.tags = [];
        $scope.project.tags = angular.copy($scope.tags);

        $scope.create = create;
        $scope._createForum = _createForum;
        $scope.onFileSelect = onFileSelect;

        /**
         * @param {Boolean} valid
         * @param {Object} e
         */
        function create(valid, e) {
            e.preventDefault();

            if(!valid) {
                return;
            }

            if (Type.isUndefined($scope.project.description.detailed) ||
                $scope.project.description.detailed === '' ||
                $scope.project.tags.length === 0) {
                errorService.showError('All fields are required.');
                return;
            }

            var params = {
                title: $scope.project.title,
                tags: $scope.project.tags,
                image_url: $scope.project.image_url,
                area: 'test area',
                description: {
                    brief: $scope.project.description.brief,
                    detailed: $scope.project.description.detailed
                }
            };

            addService.create(params)
                .then(function(res) {
                    $scope._createForum(res.data.research_id);
                }, function(err) {
                    console.log(err.message);
                });
        };

        /**
         * @param {Number} id
         */
        function _createForum(id){
            var params = {
                researchId: id,
                subject: 'Default forum'
            };

            addService.createForum(params)
                .then(function(res) {
                    $state.go('project.about', {id: id});
                }, function(err) {
                    console.log(err.message);
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
    }
})();