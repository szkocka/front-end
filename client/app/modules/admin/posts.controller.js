'use strict';
define(['angular'], function (angular) {
    angular.module('researchApp.Controllers')
        .controller('PostsCtrl', ['$scope', '$stateParams', '$q', 'User', 'AppSettings',
        function ($scope, $stateParams, $q, User, AppSettings) {
            /** @private {String} */
            $scope.userId = $stateParams.userId;
            /** @private {String} */
            $scope.userName = $stateParams.userName;
            /** @public {Array<Object>} */
            $scope.posts = [];

            $scope.limit = AppSettings.getLoadLimit();

            /** @private {Object} */
            $scope.cursor = {
                forums: '',
                messages: '',
                researches: ''
            };
            /** @private {Object} */
            $scope.loadMoreAvailable = {
                forums: true,
                messages: true,
                researches: true
            };
            /** @public {String} */
            $scope.errorMsg = null;

            /**
             * @public
             */
            $scope.loadMore = function() {
                $scope._init();
            };

            /**
             * @private
             */
            $scope._init = function() {
                $q.all([$scope._getForums(), $scope._getMessages(), $scope._getResearches()])
                    .then(function(){
                        $scope.posts.sort(function(a, b) {
                            return new Date(b.created).getTime() - new Date(a.created).getTime();
                        });

                    });
            }

            /**
             * @private
             */
            $scope._getForums = function() {
                var defer = $q.defer();

                if(!$scope.loadMoreAvailable.forums) {
                    defer.resolve();
                    return;
                }

                User.getForums({ id: $scope.userId, cursor: $scope.cursor.forums },
                function(res) {
                    if ($scope.cursor.forums == res.cursor) {
                        defer.resolve();
                        return;
                    }
                    if (res.forums.length < $scope.limit) {
                        $scope.loadMoreAvailable.forums = false;
                    }
                    $scope.cursor.forums = res.cursor;

                    res.forums.forEach(function(forum) {
                        forum.type = 'FORUM';
                        forum.title = forum.subject;
                        $scope.posts.push(forum);
                    });
                    defer.resolve();

                    }, function(err) {
                        $scope.loadMoreAvailable.forums = false;
                        defer.reject();
                    });

                return defer.promise;
            };

            /**
             * @private
             */
            $scope._getMessages = function() {
                var defer = $q.defer();

                if(!$scope.loadMoreAvailable.messages) {
                    defer.resolve();
                    return;
                }

                User.getMessages({ id: $scope.userId, cursor: $scope.cursor.messages },
                function(res) {
                    if ($scope.cursor.messages == res.cursor) {
                        defer.resolve();
                        return;
                    }
                    if (res.messages.length < $scope.limit) {
                        $scope.loadMoreAvailable.messages = false;
                    }
                    $scope.cursor.messages = res.cursor;

                    res.messages.forEach(function(message) {
                        message.created = message.created[0];
                        message.title = message.message;
                        message.id = message.id[0];
                        message.type = 'MESSAGE';

                        $scope.posts.push(message);
                    });
                    defer.resolve();
                    }, function(err) {
                        $scope.loadMoreAvailable.messages = false;
                        defer.reject();
                    });

                return defer.promise;
            };

            /**
             * @private
             */
            $scope._getResearches = function() {
                var defer = $q.defer();

                if(!$scope.loadMoreAvailable.researches) {
                    defer.resolve();
                    return;
                }
                User.getResearches({id: $scope.userId, cursor: $scope.cursor.researches},
                function(res) {
                    if ($scope.cursor.researches == res.cursor) {
                        defer.resolve();
                        return;
                    }
                    if (res.researches.length < $scope.limit) {
                        $scope.loadMoreAvailable.researches = false;
                    }
                    $scope.cursor.researches = res.cursor;

                    res.researches.forEach(function(research) {
                        if (research.relationship_type === 'SUPERVISOR') {
                            research.type = 'RESEARCH';
                            $scope.posts.push(research);

                        }
                    });
                    defer.resolve();
                    }, function(err) {
                        $scope.loadMoreAvailable.researches = false;
                        defer.reject();
                    });

                return defer.promise;
            };

            $scope._init();
    }]);
});
