;(function() {
    'use strict';

    angular
        .module('project-messages')
        .controller('ForumMessagesController', ForumMessagesController);

    /* ngInject */
    function ForumMessagesController($scope, $stateParams, LOAD_LIMIT, messagesService,
    Assert, accountService, dialogService) {
        /** @private {String} */
        $scope.forumId = $stateParams.forumId;
        /** @private {String} */
        $scope.projectId = $stateParams.projectId;
        /** @public {Boolean} */
        $scope.isSupervisor = $stateParams.isSupervisor === 'true';
        /** @public {Object} */
        $scope.user = accountService.getCurrentUser();
        /** @public {Object} */
        $scope.isAdmin = accountService.isAdmin();
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
        /** @public {String} */
        $scope.currentNavItem = 'comments';

        $scope._getActiveForum = _getActiveForum;
        $scope._init = _init;
        $scope.loadMore = loadMore;
        $scope.postMessage = postMessage;
        $scope.updateMessage = updateMessage;
        $scope.confirmDelete = confirmDelete;
        $scope._deleteMessage = _deleteMessage;

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
                    $scope.activeForumMessages = [];
                    $scope.newMessage = '';
                    $scope.cursor = null;
                    $scope._init();
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
                id: msg.id,
                message: msg.message
            };

            messagesService.updateMessage(params)
                .then(function(res) {
                    msg.showEditedTextaria = false;
                }, function(err) {
                    console.log(err.message);
                });
        };

        /**
         * @param {Object} msg
         * @param {Object} ev
         */
        function confirmDelete(msg, ev) {
            var title = 'Delete this comment?';
            var message = '';
            var button = 'DELETE';
            var callback = $scope._deleteMessage;

            dialogService.confirm(title, message, button, callback, ev, msg);
        };

        /**
         * @param {Object} msg
         * @param {Object} e
         */
        function _deleteMessage(msg){
            Assert.isObject(msg, 'Invalid "msg" type');

            var params = {
                id: msg.id
            };

            messagesService.deleteMessage(params)
                .then(function(res) {
                    _.remove($scope.activeForumMessages, function(item) {
                        return item.id[0] === msg.id[0];
                    });
                }, function(err) {
                    console.log(err.message);
                });
        };

        $scope._init();
        $scope._getActiveForum();
    }
})();