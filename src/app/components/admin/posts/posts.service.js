;(function() {
    'use strict';

    angular
        .module('admin.posts')
        .factory('postsService', postsService);

    /* ngInject */
    function postsService($http, API_URL, Assert, Type) {
        return {
            getResearches: getResearches,
            deleteResearch: deleteResearch,
            getForums: getForums,
            updateForum: updateForum,
            deleteForum: deleteForum,
            getMessages: getMessages,
            updateMessage: updateMessage,
            deleteMessage: deleteMessage
        }
        /**
         * @param {Object} params
         * @return {Promise}
         */
        function getResearches(params) {
            Assert.isObject(params, 'Invalid "params" type');
            var query = '';

            if (Type.isString(params.cursor)) {
                query = '?cursor=' + params.cursor;
            }
            return $http.get(API_URL + 'users/' + params.id + '/researches' + query);
        }

        /**
         * @param {Number} id
         * @return {Promise}
         */
        function deleteResearch(id) {
            return $http.delete(API_URL + 'researches/' + id);
        }

        /**
         * @param {Object} params
         * @return {Promise}
         */
        function getForums(params) {
            Assert.isObject(params, 'Invalid "params" type');
            var query = '';

            if (Type.isString(params.cursor)) {
                query = '?cursor=' + params.cursor;
            }
            return $http.get(API_URL + 'users/' + params.id + '/forums' + query);
        }

        /**
         * @param {Object} params
         * @return {Promise}
         */
        function updateForum(params) {
            Assert.isObject(params, 'Invalid "params" type');

            return $http.put(API_URL + 'forums/' + params.id, params);
        }

        /**
         * @param {Number} id
         * @return {Promise}
         */
        function deleteForum(id) {
            return $http.delete(API_URL + 'forums/' + id);
        }

        /**
         * @param {Object} params
         * @return {Promise}
         */
        function getMessages(params) {
            Assert.isObject(params, 'Invalid "params" type');
            var query = '';

            if (Type.isString(params.cursor)) {
                query = '?cursor=' + params.cursor;
            }
            return $http.get(API_URL + 'users/' + params.id + '/messages' + query);
        }

        /**
         * @param {Object} params
         * @return {Promise}
         */
        function updateMessage(params) {
            Assert.isObject(params, 'Invalid "params" type');

            return $http.put(API_URL + 'forums/messages/' + params.id, params);
        }

        /**
         * @param {Number} id
         * @return {Promise}
         */
        function deleteMessage(id) {
            return $http.delete(API_URL + 'forums/messages/' + id);
        }
    }
})();