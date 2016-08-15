;(function() {
    'use strict';

    angular
        .module('news.add')
        .controller('NewsAddController', NewsAddController);

    /* ngInject */
    function NewsAddController($scope, $state, newsService, Upload, API_URL, Assert, Type) {
        /** @public {Object} */
        $scope.newsToAdd = {};
        /** @public {String} */
        $scope.errorMsg = null;

        $scope.save = save;
        $scope.cancel = cancel;
        $scope.onFileSelect = onFileSelect;

        /**
         * @param {Boolean} valid
         * @param {Object} event
         */
        function save(valid, e) {
            e.preventDefault();

            if (!valid || Type.isUndefined($scope.newsToAdd.body) ||
                $scope.newsToAdd.body == '') {
                $scope.errorMsg = 'Form is not valid';
                return;
            }

            newsService.create($scope.newsToAdd)
                .then(function(res) {
                    $state.go('news');
                }, function(err) {
                    $scope.errorMsg = 'Failed to create';
                });
        };

        function cancel() {
            $state.go('news');
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
                $scope.newsToAdd.image_url = data.url;
            }).error(function(err) {
                console.log('Error uploading file: ' + err.message || err);
            });
        };
    }
})();