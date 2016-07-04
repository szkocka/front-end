'use strict';
define(['angular'], function (angular) {
    angular.module('researchApp.Controllers')
        .controller('NewsCtrl', ['$scope', 'Upload', 'AppSettings', 'isAdmin', 'NewsService', 'Assert', 'Type',
        function ($scope, Upload, AppSettings, isAdmin, NewsService, Assert, Type) {

            /** @public {Boolean} */
            $scope.showAddButton = isAdmin;

            /** @public {Array<Object>} */
            $scope.news = [];

            /** @public {Object} */
            $scope.newsToAdd = {};

            /** @public {Boolean} */
            $scope.showMore = true;

            /** @public {Boolean} */
            $scope.addNewsSection = false;

            /** @private {Boolean} */
            $scope.loadMoreAvailable = true;

            /** @private {String} */
            $scope.cursor = null;

            /** @public {String} */
            $scope.errorMsg = null;

            /** @private {Boolean} */
            $scope.loadMoreAvailable = true;

            /** @private {Number} */
            $scope.appSettings = AppSettings.getAppSettings();

            /**
             * @public
             */
            $scope.loadMore = function() {
                if($scope.loadMoreAvailable) {
                    $scope._init();
                }
            };

            /**
             * @private
             */
            $scope._init = function() {

                $scope.errorMsg = null;

                NewsService.getNews($scope.cursor, function(err, res) {
                    if (Type.isNull(res)) {
                        $scope.errorMsg = 'Error: Page was not loaded';
                        $scope.loadMoreAvailable = false;
                    } else {
                        if ($scope.cursor == res.data.cursor) {
                            return;
                        }
                        if (res.data.news.length < $scope.appSettings.loadLimit) {
                            $scope.loadMoreAvailable = false;
                        }
                        $scope.cursor = res.data.cursor;

                        res.data.news.forEach(function(el) {
                            // create view object
                            var tmpObj = {};
                            tmpObj.viewNews = el;
                            tmpObj.showMore = true;

                            $scope.news.push(tmpObj);
                        });
                    }
                });
            }

            /**
             * @public
             * @param {Object} el
             */
            $scope.showMore = function(el) {
                Assert.isObject(el, 'Invalid "el" type');
                el.showMore = false;
            };

            /**
             * @public
             * @param {Object} el
             */
            $scope.showLess = function(el) {
                Assert.isObject(el, 'Invalid "el" type');
                el.showMore = true;
            };

            /**
             * @public
             */
            $scope.addNews = function() {
                $scope.showAddButton = false;
                $scope.addNewsSection = true;
            };

            /**
             * @public
             */
            $scope.save = function() {

                if (Type.isUndefined($scope.newsToAdd.title) || $scope.newsToAdd.title == '' ||
                    Type.isUndefined($scope.newsToAdd.body) || $scope.newsToAdd.body == '') {
                    $scope.errorMsg = 'Required field';
                    return;
                }

                NewsService.createNews($scope.newsToAdd, function(err, res) {
                    if (Type.isNull(res)) {
                        $scope.errorMsg = 'Failed to create';
                    } else {
                        $scope.showAddButton = true;
                        $scope.addNewsSection = false;
                        $scope.newsToAdd = {};
                        $scope.news = [];
                        $scope.cursor = null;
                        $scope.loadMoreAvailable = true;
                        $scope._init();
                    }
                });
            };

            /**
             * @public
             */
            $scope.cancel = function() {
                $scope.showAddButton = true;
                $scope.addNewsSection = false;
                $scope.errorMsg = null;
            };

            /**
             * @public
             * @param {Object} event
             */
            $scope.onFileSelect = function(event) {
                Assert.isObject(event, 'Invalid "event" type');

                var image = event.target.files[0];
                
                if (image.type !== 'image/png' && image.type !== 'image/jpeg') {
                        alert('Only PNG and JPEG are accepted.');
                        return;
                }

                $scope.upload = Upload.upload({
                        url: $scope.appSettings.API_URL + 'upload',
                        method: 'POST',
                        file: image
                }).success(function(data, status, headers, config) {
                        $scope.newsToAdd.image_url = data.url;
                }).error(function(err) {
                        console.log('Error uploading file: ' + err.message || err);
                });
            };

            /**
             * @public
             * @param {Object} el
             * @return {String}
             */
            $scope.detectClass = function(el) {
                Assert.isObject(el, 'Invalid "el" type');
                if(el.showMore) {
                    return 'short-decsr';
                } else {
                    return 'long-decsr';
                }
            };

            $scope._init();
    }]);
});