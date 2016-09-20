;(function() {
    'use strict';

    angular
        .module('admin.users')
        .factory('usersService', usersService);

    /* ngInject */
    function usersService($http, API_URL, Assert, Type) {
        return {
            queryUsers: queryUsers,
            deleteUsers: deleteUsers,
            banUsers: banUsers,
            restoreUser: restoreUser
        }

        /**
         * @param {Object} params
         * @return {Promise}
         */
        function queryUsers(data) {
            Assert.isObject(data, 'Invalid "data" type');

            var _createQuery = function(data) {
                var params = [];

                if (!Type.isNull(data.keyword) && data.keyword != '') {
                    var keyword = 'keyword=' + data.keyword;
                    params.push(keyword);
                }

               if (Type.isString(data.cursor)) {
                    var cursor = 'cursor=' + data.cursor;
                    params.push(cursor);
                }
                return params.join('&');
            };

            return $http.get(API_URL + 'users?' + _createQuery(data));
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

        /**
         * @param {String} id
         * @return {Promise}
         */
        function restoreUser(id) {
            return $http.post(API_URL + '/users/unbanned/' + id);
        }
    }
})();