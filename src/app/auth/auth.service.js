;(function() {
    angular
        .module('auth')
        .factory('authService', authService);

    /* ngInject */
    function authService($http, $cookies, accountService, Assert) {
        var isAuthorized = false;
        return {
            auth: auth,
            unAuth: unAuth,
            isAuth: isAuth
        };

        function auth(token) {
            Assert.isString(token, 'Invalid "token" type');
            isAuthorized = true;
            $cookies.put('token', token);
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + $cookies.get('token');
        }

        function unAuth() {
            isAuthorized = false;
            $cookies.remove('token');
            accountService.clear();
            $http.defaults.headers.common['Authorization'] = '';
        }

        function isAuth() {
            return isAuthorized;
        }
    }
})();