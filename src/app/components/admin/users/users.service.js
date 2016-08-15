;(function() {
    'use strict';

    angular
        .module('admin.users')
        .factory('usersService', usersService);

    /* ngInject */
    function usersService($http, API_URL, Assert, Type) {
        return {
            getUsers: getUsers,
            queryUsers: queryUsers,
            deleteUsers: deleteUsers,
            banUsers: banUsers,
            changeRole: changeRole
        }

        /**
         * @param {String} cursor
         * @return {Promise}
         */
        function getUsers(cursor) {
            Assert.isString(cursor, 'Invalid "cursor" type');
            var query = '';

            if (Type.isString(cursor)) {
                query = '?cursor=' + cursor;
            }
            return $http.get(API_URL + 'users' + query);
        }

        /**
         * @param {Object} params
         * @return {Promise}
         */
        function queryUsers(params) {
            Assert.isObject(params, 'Invalid "params" type');
            return $http.get(API_URL);
        }

        /**
         * @param {Object} params
         * @return {Promise}
         */
        function deleteUsers(params) {
            return $http.post(API_URL + 'users/deleted', params);
        }

        /**
         * @param {Object} params
         * @return {Promise}
         */
        function banUsers(params) {
            return $http.post(API_URL + 'users/banned', params);
        }

        function changeRole() {
            return $http.post(API_URL);
        }
    }
})();