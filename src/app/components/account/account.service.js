;(function() {
    'use strict';

    angular
        .module('account')
        .factory('accountService', accountService);

    /* ngInject */
    function accountService($http, $q, API_URL) {
        /** @private {Object} */
        var currentUser = {};

        return {
            get: get,
            getCurrentUser: getCurrentUser,
            isAdmin: isAdmin,
            clear: clear
        };

        /** @return {Promise} */
        function get() {
            var deferred = $q.defer();

            $http.get(API_URL + 'users/me')
                .then(
                    function(response) {
                        currentUser = response.data.user;
                        deferred.resolve();
                    },
                    function(err) {
                        console.log(err);
                        deferred.reject(err);
                    });

            return deferred.promise;
        };

        /** @return {Object} */
        function getCurrentUser() {
            return currentUser;
        };

        /** @return {Boolean} */
        function isAdmin() {
            return currentUser.role === 'admin';
        };

        /** @return {Boolean} */
        function clear() {
            currentUser = {};
        };
    }
})();