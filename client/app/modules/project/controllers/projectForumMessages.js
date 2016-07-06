'use strict';

define(['angular'], function (angular) {
    angular.module('researchApp.Controllers').controller('ProjectForumMessagesCtrl',
        ['$scope', '$stateParams', 'AppSettings', 'ForumsService', 'MessagesService', 'Assert', 'Type',
        function ($scope, $stateParams, AppSettings, ForumsService, MessagesService, Assert, Type) {
            /** @private {String} */
            $scope.forumId = $stateParams.forumId;
            /** @private {Number} */
            $scope.limit = AppSettings.getLoadLimit;
            /** @public {String} */
            $scope.newMessage = null;
            /** @public {Object} */
            $scope.activeForum = {};
            /** @public {Array<Object>} */
            $scope.activeForumMessages = [];
            /** @public {String} */
            $scope.cursor = null;
            /** @public {Boolean} */
            $scope.loadMoreAvailable = true;
            /** @public {String} */
            $scope.errorMsg = null;

            /**
             * @private
             */
            $scope._getActiveForum = function() {
                ForumsService.getForumById($scope.forumId, function(err, res){
                    if (Type.isNull(res)) {
                        $scope.errorMsg = 'Forum was not found';
                    } else {
                        $scope.activeForum = res.data;
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
             * @private
             */
            $scope._init = function() {
                $scope.errorMsg = null;

                var params = {
                    cursor: $scope.cursor,
                    forumId: $scope.forumId
                };

                MessagesService.getForumMessages(params, function(err, res) {
                    if (Type.isNull(res)) {
                        $scope.errorMsg = 'Error: Messages were not loaded';
                        $scope.loadMoreAvailable = false;
                    } else {
                        if ($scope.cursor == res.data.cursor) {
                            return;
                        }
                        if (res.data.messages.length < $scope.limit) {
                            $scope.loadMoreAvailable = false;
                        }
                        $scope.cursor = res.data.cursor;

                        res.data.messages.forEach(function(msg) {
                            $scope.activeForumMessages.push(msg);
                        });
                    }
                });
            };

            /**
             * @public
             * @param {String} text
             */
            $scope.postMessage = function(text){
                Assert.isString(text, 'Invalid "text" type');

                $scope.newMessage = null;
                var params = {
                    forumId: $scope.forumId,
                    message: text
                };

                MessagesService.createNewMessage(params, function(err, res) {
                    if (Type.isNull(res)) {
                        $scope.errorMsg = 'Error: Messages was not added';
                    } else {
                        var msg = {
                            message: text,
                            createdBy: {name:'You'},
                            created: new Date()
                        };
                        $scope.activeForumMessages.push(msg);
                    }
                });
            };

            $scope._init();
            $scope._getActiveForum();
    }]);
});