;(function() {
    'use strict';

    angular
        .module('app')
        .config(config);

    /* ngInject */
    function config($urlRouterProvider, $httpProvider) {
        $urlRouterProvider.otherwise('/');
        $httpProvider.interceptors.push('authInterceptorService');
    }
})();
