;(function() {
    'use strict';

    angular
        .module('restricted-area')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('restricted-area', {
            abstract: true,
            resolve: {
                $q: '$q',
                $timeout: '$timeout',
                $state: '$state',
                authService: 'authService',
                authResolver: authResolver
            },
            views: {
                content: {
                    templateUrl: 'layouts/restricted-area/restricted-area.html'
                }
            }
        });
    }

    /* ngInject */
    function authResolver(accountService) {
        return accountService.get();
    }
})();