;(function() {
    'use strict';

    angular
        .module('free-area')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('free-area', {
            abstract: true,
            resolve: {
                freeAreaResolver: freeAreaResolver
            },
            views: {
                content: {
                    templateUrl: 'layouts/free-area/free-area.html',
                    controller: 'FreeAreaController'
                }
            }
        });
    }

    /* ngInject */
    function freeAreaResolver(authService, accountService) {
        if (authService.isAuth()) {
            return accountService.get();
        }
    }
})();