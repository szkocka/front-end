;(function() {
    'use strict';

    angular
        .module('forgot-password')
        .factory('forgotPasswordService', forgotPasswordService);

    /* ngInject */
    function forgotPasswordService($http, API_URL) {
        return {
            /**
             * @param  {Object}   params     - user info
             * @return {Promise}
             */
            setPassword: function(params) {
                
            }
        };
    }
})();