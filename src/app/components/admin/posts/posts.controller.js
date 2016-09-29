;(function() {
    'use strict';

    angular
        .module('admin.posts')
        .controller('PostsController', PostsController);

    /* ngInject */
    function PostsController($q, $scope, $stateParams, $state, LOAD_LIMIT, postsService, Assert, Type) {
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

        $scope.editPost = editPost;
        $scope.updatePost = updatePost;
        $scope._updateForum = _updateForum;
        $scope._updateMessage = _updateMessage;

        $scope.deletePost = deletePost;
        $scope._removePostFromScreen = _removePostFromScreen;


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
                        forum.isEditing = false;
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
                        message.isEditing = false;

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

        /**
         * @param {Object} post
         */
        function editPost(post) {
            Assert.isObject(post, 'Invalid "post" type');
            switch(post.type) {
                case 'RESEARCH':
                    $state.go('project-update', {id: post.id});
                    break;
                default:
                    $scope.posts.forEach(function(item) {
                        item.isEditing = false;
                    });

                    post.isEditing = true;
            }
        };

        /**
         * @param {Object} post
         */
        function updatePost(post) {
            Assert.isObject(post, 'Invalid "post" type');

            switch(post.type) {
                case 'FORUM':
                    $scope._updateForum(post);
                    break;
                case 'MESSAGE':
                    $scope._updateMessage(post);
                    break;
                default:
                    return;
            }
        };

        /**
         * @param {Object} post
         */
        function _updateForum(post){
            Assert.isObject(post, 'Invalid "post" type');

            var params = {
                id: post.id,
                subject: post.title
            };

            postsService.updateForum(params)
                .then(function(res) {
                    post.isEditing = false;
                }, function(err) {
                    console.log(err);
                });
        };

        /**
         * @param {Object} post
         */
        function _updateMessage(post){
            Assert.isObject(post, 'Invalid "post" type');

            var params = {
                id: post.id,
                message: post.title
            };

            postsService.updateMessage(params)
                .then(function(res) {
                    post.isEditing = false;
                }, function(err) {
                    console.log(err);
                });
        };

        /**
         * @param {Object} post
         */
        function deletePost(post) {
            Assert.isObject(post, 'Invalid "post" type');

            switch(post.type) {
                case 'RESEARCH':
                    postsService.deleteResearch(post.id)
                        .then(function(res) {

                            $scope._removePostFromScreen(post);

                        }, function(err) {
                            console.log(err);
                        });
                    break;
                case 'FORUM':
                    postsService.deleteForum(post.id)
                        .then(function(res) {

                            $scope._removePostFromScreen(post);

                        }, function(err) {
                            console.log(err);
                        });
                    break;
                case 'MESSAGE':
                    postsService.deleteMessage(post.id)
                        .then(function(res) {

                            $scope._removePostFromScreen(post);

                        }, function(err) {
                            console.log(err);
                        });
                    break;
                default:
                    return;
            }
        };

        /**
         * @param {Object} post
         */
        function _removePostFromScreen(post) {
            Assert.isObject(post, 'Invalid "post" type');

            _.remove($scope.posts, function(item) {
                return item.id === post.id;
            });
        }

        $scope._init();
    }
})();