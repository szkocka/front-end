;(function() {
    'use strict';

    angular
        .module('project-messages')
        .controller('ForumMessagesController', ForumMessagesController);

    /* ngInject */
    function ForumMessagesController($scope, $stateParams, LOAD_LIMIT, messagesService,
    Assert, accountService, dialogService, linkify) {
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
        $scope.cursor = '';
        /** @public {Boolean} */
        $scope.loadMoreAvailable = true;
        /** @private {Boolean} */
        $scope._isBusy = false;
        /** @public {String} */
        $scope.currentNavItem = 'comments';
        /** @public {Boolean} */
        $scope.isLoading = false;

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
            $scope.isLoading = true;

            // fix to prevent multiple requests from ngInfinitiveScroll
            if ($scope._isBusy) return;
            $scope._isBusy = true;

            messagesService.getForumMessages(params)
                .then(function(res) {
                    $scope.isLoading = false;
                    if ($scope.cursor == res.data.cursor) {
                        return;
                    }
                    if (res.data.messages.length < LOAD_LIMIT) {
                        $scope.loadMoreAvailable = false;
                    }
                    $scope.cursor = res.data.cursor;

                    res.data.messages.forEach(function(msg) {
                        
                        msg.showEditedTextaria = false;
                        msg.messageToEdit = msg.message;
                        $scope.activeForumMessages.push(msg);
                    });
                    $scope._isBusy = false;
                }, function(err) {
                    $scope.loadMoreAvailable = false;
                    $scope._isBusy = false;
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
                message: linkify.linkifyString(text)
            };

            messagesService.createNewMessage(params)
                .then(function(res) {
                    var msg = {
                        message: params.message,
                        createdBy: {name:'You', id: $scope.user._id},
                        created: new Date(),
                        messageToEdit: params.message,
                        id: [res.data.message_id]
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
                id: msg.id,
                message: linkify.linkifyString(msg.messageToEdit)
            };

            messagesService.updateMessage(params)
                .then(function(res) {
                    msg.message = params.message;
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