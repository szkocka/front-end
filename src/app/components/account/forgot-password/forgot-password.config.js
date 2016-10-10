;(function() {
    'use strict';

    angular
        .module('forgot-password')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('forgot-password', {
            url: '^/forgot-password/:token',
            parent: 'free-area',
            views: {
                content: {
                    templateUrl: 'components/account/forgot-password/forgot-password.html',
                    controller: 'ForgotPasswordController'
                }
            }
        });
    }
})();