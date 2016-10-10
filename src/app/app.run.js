;(function() {
    'use strict';

    angular
        .module('app')
        .run(run);

    /* ngInject */
    function run($http, $rootScope, $state, $cookies, authService, errorService) {
        $rootScope.signOut = signOut;

        //Checking auth...
        if ($cookies.get('token')) {
            authService.auth($cookies.get('token'));
        }
        // error handling
        $rootScope.$on( 'httpError', function( event, eventData ) {
            if (eventData && eventData.response && eventData.response.data) {
                errorService.showError( eventData.response.data.message );
            }
        })

        function signOut() {
            authService.unAuth();
            if ($state.current.name !== 'sign-up') {
                $state.go('sign-in');
            }
        }
    }
})();
