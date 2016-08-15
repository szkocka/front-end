;(function() {
    'use strict';

    angular
        .module('admin.posts')
        .factory('postsService', postsService);

    /* ngInject */
    function postsService($http, API_URL, Assert, Type) {
        return {
            getResearches: getResearches,
            getForums: getForums,
            getMessages: getMessages
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
        function getMessages(params) {
            Assert.isObject(params, 'Invalid "params" type');
            var query = '';

            if (Type.isString(params.cursor)) {
                query = '?cursor=' + params.cursor;
            }
            return $http.get(API_URL + 'users/' + params.id + '/messages' + query);
        }
    }
})();