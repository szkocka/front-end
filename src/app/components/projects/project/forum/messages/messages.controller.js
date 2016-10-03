;(function() {
    'use strict';

    angular
        .module('project.messages')
        .controller('ForumMessagesController', ForumMessagesController);

    /* ngInject */
    function ForumMessagesController($scope, $stateParams, LOAD_LIMIT, messagesService, Assert, accountService) {
        /** @private {String} */
        $scope.forumId = $stateParams.forumId;
        /** @public {Object} */
        $scope.user = accountService.getCurrentUser();
        /** @public {Object} */
        $scope.activeForum = {};
        /** @public {Array<Object>} */
        $scope.activeForumMessages = [];
        /** @public {String} */
        $scope.newMessage = null;
        /** @public {String} */
        $scope.cursor = null;
        /** @public {Boolean} */
        $scope.loadMoreAvailable = true;

        $scope._getActiveForum = _getActiveForum;
        $scope._init = _init;
        $scope.loadMore = loadMore;
        $scope.postMessage = postMessage;
        $scope.updateMessage = updateMessage;

        function _getActiveForum() {
            messagesService.getForumById($scope.forumId)
                .then(function(res) {
                    $scope.activeForum = res.data;
                },function(err) {
                    console.log(err.message);
                });
        };

        function loadMore() {
            if($scope.loadMoreAvailable) {
                $scope._init();
            }
        };

        function _init() {
            var params = {
                cursor: $scope.cursor,
                forumId: $scope.forumId
            };

            messagesService.getForumMessages(params)
                .then(function(res) {
                    if ($scope.cursor == res.data.cursor) {
                        return;
                    }
                    if (res.data.messages.length < LOAD_LIMIT) {
                        $scope.loadMoreAvailable = false;
                    }
                    $scope.cursor = res.data.cursor;

                    res.data.messages.forEach(function(msg) {
                        
                        msg.showEditedTextaria = false;
                        $scope.activeForumMessages.push(msg);
                    });
                }, function(err) {
                    $scope.loadMoreAvailable = false;
                    console.log(err.message);
                });
        };

        /**
         * @param {String} text
         * @param {Object} e
         */
        function postMessage(text, e){
            Assert.isString(text, 'Invalid "text" type');
            e.preventDefault();

            var params = {
                forumId: $scope.forumId,
                message: text
            };

            messagesService.createNewMessage(params)
                .then(function(res) {
                    var msg = {
                        message: text,
                        createdBy: {name:'You'},
                        created: new Date()
                    };
                    $scope.activeForumMessages.push(msg);
                    $scope.newMessage = '';
                }, function(err) {
                    console.log(err.message);
                });
        };

        /**
         * @param {Object} msg
         * @param {Object} e
         */
        function updateMessage(msg, e){
            Assert.isObject(msg, 'Invalid "msg" type');
            e.preventDefault();

            var params = {
                id: msg.id[0],
                message: msg.message
            };
            return;

            messagesService.updateMessage(params)
                .then(function(res) {
                    msg.showEditedTextaria = false;
                }, function(err) {
                    console.log(err.message);
                });
        };

        $scope._init();
        $scope._getActiveForum();
    }
})();