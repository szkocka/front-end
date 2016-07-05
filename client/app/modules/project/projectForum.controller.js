'use strict';

define(['angular'], function (angular) {
    angular.module('researchApp.Controllers').controller('ProjectForumCtrl',
        ['$scope', '$stateParams', 'Auth', '$state', 'ForumsService', 'Assert', 'Type', 'AppSettings',
        function ($scope, $stateParams, Auth, $state, ForumsService, Assert, Type, AppSettings) {
            /** @private {String} */
            $scope.researchId = $stateParams.id;
            /** @public {Array<Object>} */
            $scope.forums = [];
            /** @public {Boolean} */
            $scope.forumsAccessError = true;
            /** @public {String} */
            $scope.cursor = null;
            /** @public {Boolean} */
            $scope.loadMoreAvailable = true;
            /** @public {Number} */
            $scope.limit = AppSettings.getLoadLimit();
            /** @public {String} */
            $scope.errorMsg = null;

            /**
             * @private
             */
            $scope._init = function() {
                Auth.isLoggedInAsync(function(login){
                    if(login) {
                        $scope.getForums();
                    } else {
                        $scope.forumsAccessError = true;
                    }
                });
            };

            /**
             * @public
             */
            $scope.loadMore = function() {
                if($scope.loadMoreAvailable) {
                    $scope._init();
                }
            };

            /**
             * @public
             */
            $scope.getForums = function(){
                $scope.errorMsg = null;

                var params = {
                    researchId: $scope.researchId,
                    cursor: $scope.cursor
                };
                ForumsService.getForums(params, function(err, res) {
                    if (Type.isNull(res)) {
                        $scope.errorMsg = 'Error: Forums were not loaded';
                        $scope.loadMoreAvailable = false;
                    } else {
                        $scope.forumsAccessError = false;
                        if ($scope.cursor == res.data.cursor) {
                            return;
                        }
                        if (res.data.forums.length < $scope.limit) {
                            $scope.loadMoreAvailable = false;
                        }
                        $scope.cursor = res.data.cursor;

                        res.data.forums.forEach(function(forum) {
                            $scope.forums.push(forum);
                        });
                    }
                });
            };

            /**
             * @public
             * @param {String} topic
             */
            $scope.createForum = function(topic){
                Assert.isStringt(topic, 'Invalid "topic" type');

                var params = {
                    researchId: $scope.researchId,
                    subject: topic
                };

                ForumsService.createNews(params, function(err, res) {
                    if (Type.isNull(res)) {
                        $scope.errorMsg = 'Failed to create new forum';
                    } else {
                        $state.go('project.forum.one', {forumId: res.forum_id});
                    }
                });
            };
    }]);
});