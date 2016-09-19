;(function() {
    angular
        .module('auth')
        .factory('authInterceptorService', authInterceptorService);

    /* ngInject */
    function authInterceptorService($q, $timeout, $rootScope, $cookies) {
        return {
            responseError: responseError
        };

        function responseError(response) {
            if (response.status === 401) {
                $timeout(function() {
                    $rootScope.signOut();
                });
            } else {
                $rootScope.$broadcast( 'httpError', { response: response } );
            }
            return $q.reject(response);
        };
    }
})();