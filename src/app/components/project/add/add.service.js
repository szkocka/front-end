;(function() {
    'use strict';

    angular
        .module('add')
        .factory('addService', addService);

    /* ngInject */
    function addService($http, API_URL, Assert) {
        return {
            create: create,
            createForum: createForum
        }

        /** @param {Object} params */
        function create(params) {
            Assert.isObject(params, 'Invalid "params" type');
            return $http.post(API_URL + 'researches', params);
        };

        /** @param {Object} params */
        function createForum(params) {
            Assert.isObject(params, 'Invalid "params" type');
            Assert.isString(params.subject, 'Invalid "params.subject" type');
            return $http.post(API_URL + 'researches/' + params.researchId + '/forums', params);
        };
    }
})();