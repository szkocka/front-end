;(function() {
    'use strict';

    angular
        .module('sign-in')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('sign-in', {
            url: '^/sign-in',
            parent: 'auth-area',
            views: {
                content: {
                    templateUrl: 'components/account/sign-in/sign-in.html',
                    controller: 'SignInController'
                }
            }
        });
    }
})();