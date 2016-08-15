;(function() {
    'use strict';

    angular
        .module('about')
        .factory('aboutService', aboutService);

    /* ngInject */
    function aboutService($http, API_URL, Assert) {
        return {
            get: get,
            update: update
        };

        function get() {
            return $http.get(API_URL + 'pages/about');
        }

        function update(params) {
            Assert.isObject(params, 'Invalid "params" type');
            Assert.isString(params.content, 'Invalid "params.content" type');

            return $http.post(API_URL + 'pages/about', params);
        }
    }
})();
