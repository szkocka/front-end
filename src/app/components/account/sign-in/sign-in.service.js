;(function() {
    'use strict';

    angular
        .module('sign-in')
        .factory('signInService', signInService);

    /* ngInject */
    function signInService($http, $q, API_URL, authService, Assert, $rootScope) {
        return {
            /**
             * @param  {Object}   user     - user info
             * @return {Promise}
             */
            signIn: function(user) {
                Assert.isObject(user, 'Invalid "user" type');

                var deferred = $q.defer();

                $http.post(API_URL + 'auth/local', user)
                .then(
                    function(response) {
                        authService.auth(response.data.token);
                        deferred.resolve();
                    },
                    function(err) {
                        deferred.reject(err);
                        $rootScope.signOut();
                    });

                return deferred.promise;
            },

            /**
             * @param  {String}   email
             * @return {Promise}
             */
            forgotPassword: function(email) {
                Assert.isString(email, 'Invalid "email" type');

                return $http.post(API_URL + 'users/reset-passwords', {email: email});
            }
        };
    }
})();