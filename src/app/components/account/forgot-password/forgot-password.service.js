;(function() {
    'use strict';

    angular
        .module('forgot-password')
        .factory('forgotPasswordService', forgotPasswordService);

    /* ngInject */
    function forgotPasswordService($http, API_URL, Assert) {
        return {
            /**
             * @param  {Object}   params     - user info
             * @return {Promise}
             */
            setPassword: function(params) {
                Assert.isObject(params, 'Invalid "params" type');

                return $http.post(API_URL + 'users/new-password', params);
            }
        };
    }
})();