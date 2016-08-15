;(function() {
    'use strict';

    angular
        .module('auth-area')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('auth-area', {
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
                    templateUrl: 'layouts/auth-area/auth-area.html'
                }
            }
        });
    }

    /* ngInject */
    function authResolver($q, $timeout, $state, accountService) {
        var deferred = $q.defer();

        accountService.get()
            .then(function() {
                $timeout(function() {
                    $state.go('home');
                });
                deferred.reject();
            }, function() {
                deferred.resolve();
            });

        return deferred.promise;
    }
})();