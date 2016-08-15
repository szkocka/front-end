;(function() {
    'use strict';

    angular
        .module('sign-up')
        .factory('signUpService', signUpService);

    /* ngInject */
    function signUpService($http, $rootScope, $q, API_URL, authService, Assert, Type) {
        return {
            /**
             * @param  {Object}   user     - user info
             * @return {Promise}
             */
            signUp: function(user) {
                Assert.isObject(user, 'Invalid "user" type');

                var deferred = $q.defer();

                $http.post(API_URL + 'users', user)
                    .then(
                        function(response) {
                            authService.auth(response.data.token);
                            deferred.resolve();
                        },
                        function(err) {
                            $rootScope.signOut();
                            deferred.reject(err);
                        });

                return deferred.promise;
            }
        };
    }
})();