;(function() {
    'use strict';

    angular
        .module('project.forum')
        .factory('forumService', forumService);

    /* ngInject */
    function forumService($http, API_URL, Assert, Type) {
        return {
            get: get,
            create: create
        }

        /**
         * @param {Object} params
         */
        function get(params) {
            Assert.isObject(params, 'Invalid "params" type');
            var query = '';

            if (Type.isNull(params.cursor)) {
                query = '/forums';
            } else {
                query = '/forums?cursor=' + params.cursor;
            }
            return $http.get(API_URL + 'researches/' + params.researchId + query);
        };

        /**
         * @param {Object} params
         */
        function create(params) {
            Assert.isObject(params, 'Invalid "params" type');
            Assert.isString(params.subject, 'Invalid "params.subject" type');
            return $http.post(API_URL + 'researches/' + params.researchId + '/forums', params);
        };
    }
})();