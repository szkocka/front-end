;(function() {
    'use strict';

    angular
        .module('admin.posts')
        .controller('PostsController', PostsController);

    /* ngInject */
    function PostsController($q, $scope, $stateParams, LOAD_LIMIT, postsService) {
        /** @private {String} */
        $scope.userId = $stateParams.userId;
        /** @private {String} */
        $scope.userName = $stateParams.userName;
        /** @public {Array<Object>} */
        $scope.posts = [];
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

        $scope._init = _init;
        $scope._getForums = _getForums;
        $scope._getMessages = _getMessages;
        $scope._getResearches = _getResearches;
        $scope.loadMore = loadMore;

        function loadMore() {
            $scope._init();
        };

        function _init() {
            $q.all([$scope._getForums(), $scope._getMessages(), $scope._getResearches()])
                .then(function(){
                    $scope.posts.sort(function(a, b) {
                        return new Date(b.created).getTime() - new Date(a.created).getTime();
                    });

                });
        }

        function _getForums() {
            var defer = $q.defer();

            if(!$scope.loadMoreAvailable.forums) {
                defer.resolve();
                return;
            }

            postsService.getForums({ id: $scope.userId, cursor: $scope.cursor.forums })
                .then(function(res) {
                    if ($scope.cursor.forums == res.data.cursor) {
                        defer.resolve();
                        return;
                    }
                    if (res.data.forums.length < LOAD_LIMIT) {
                        $scope.loadMoreAvailable.forums = false;
                    }
                    $scope.cursor.forums = res.data.cursor;

                    res.data.forums.forEach(function(forum) {
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

        function _getMessages() {
            var defer = $q.defer();

            if(!$scope.loadMoreAvailable.messages) {
                defer.resolve();
                return;
            }

            postsService.getMessages({ id: $scope.userId, cursor: $scope.cursor.messages })
                .then(function(res) {
                    if ($scope.cursor.messages == res.data.cursor) {
                        defer.resolve();
                        return;
                    }
                    if (res.data.messages.length < LOAD_LIMIT) {
                        $scope.loadMoreAvailable.messages = false;
                    }
                    $scope.cursor.messages = res.data.cursor;

                    res.data.messages.forEach(function(message) {
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

        function _getResearches() {
            var defer = $q.defer();

            if(!$scope.loadMoreAvailable.researches) {
                defer.resolve();
                return;
            }
            postsService.getResearches({id: $scope.userId, cursor: $scope.cursor.researches})
                .then(function(res) {
                    if ($scope.cursor.researches == res.data.cursor) {
                        defer.resolve();
                        return;
                    }
                    if (res.data.researches.length < LOAD_LIMIT) {
                        $scope.loadMoreAvailable.researches = false;
                    }
                    $scope.cursor.researches = res.data.cursor;

                    res.data.researches.forEach(function(research) {
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
    }
})();