;(function() {
    'use strict';

    angular
        .module('app')
        .run(run);

    /* ngInject */
    function run($http, $rootScope, $state, $cookies, authService) {
        $rootScope.signOut = signOut;

        //Checking auth...
        if ($cookies.get('token')) {
            authService.auth($cookies.get('token'));
        }

        function signOut() {
            authService.unAuth();
            $state.go('sign-in');
        }
    }
})();
