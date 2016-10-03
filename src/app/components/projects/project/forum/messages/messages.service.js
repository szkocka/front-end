;(function() {
    'use strict';

    angular
        .module('project.messages')
        .factory('messagesService', messagesService);

    /* ngInject */
    function messagesService($http, API_URL, Assert, Type) {
        return {
            getForumById: getForumById,
            getForumMessages: getForumMessages,
            createNewMessage: createNewMessage,
            updateMessage: updateMessage
        }

        /**
         * @param {String} id
         */
        function getForumById(id) {
            return $http.get(API_URL + 'forums/' + id);
        };

        /**
         * @param {Object} params
         */
        function getForumMessages(params) {
            Assert.isObject(params, 'Invalid "params" type');

            var query = '';

            if (Type.isNull(params.cursor)) {
                query = params.forumId + '/messages';
            } else {
                query = params.forumId + '/messages?cursor=' + params.cursor;
            }
            return $http.get(API_URL + 'forums/' + query);
        };

        /**
         * @param {Object} params
         */
        function createNewMessage(params) {
            Assert.isObject(params, 'Invalid "params" type');
            Assert.isString(params.message, 'Invalid "params.message" type');
            return $http.post(API_URL + 'forums/' + params.forumId + '/messages', params);
        }

        /**
         * @param {Object} params
         */
        function updateMessage(params) {
            Assert.isString(params.message, 'Invalid "params.message" type');
            return $http.put(API_URL + 'messages/' + params.id, params);
        }
    }
})();