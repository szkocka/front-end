;(function() {
    'use strict';

    angular
        .module('project')
        .factory('projectService', projectService);

    /* ngInject */
    function projectService($http, API_URL, Assert, Type) {
        return {
            getProjectById: getProjectById,
            sendInvitation: sendInvitation,
            getJoinRequests: getJoinRequests,
            joinResearch: joinResearch,
            aproveResearcher: aproveResearcher,
            rejectResearcher: rejectResearcher,
            getForums: getForums,
            createForum: createForum,
            updateForum: updateForum,
            deleteForum: deleteForum
        };

        /**
         * @param {Number} id
         */
        function getProjectById(id) {
            return $http.get(API_URL + 'researches/' + id);
        };

        /**
         * @param {Object} params
         */
        function sendInvitation(params) {
            Assert.isObject(params, 'Invalid "params" type');
            return $http.post(API_URL + 'researches/' + params.researchId + '/invites', params);
        };

        /**
         * @param {String} id
         */
        function getJoinRequests(id) {
            return $http.get(API_URL + 'researches/' + id + '/requests');
        };

        /**
         * @param {Object} params
         */
        function joinResearch(params) {
            Assert.isObject(params, 'Invalid "params" type');
            return $http.post(API_URL + 'researches/' + params.id + '/requests', params);
        };

        /**
         * @param {Object} params
         */
        function aproveResearcher(params) {
            Assert.isObject(params, 'Invalid "params" type');
            return $http.post(API_URL + 'researches/' + params.researchId + '/researchers/' + params.userId + '/approved', {});
        };

        /**
         * @param {Object} params
         */
        function rejectResearcher(params) {
            Assert.isObject(params, 'Invalid "params" type');
            return $http.post(API_URL + 'researches/' + params.researchId + '/researchers/' + params.userId + '/rejected', {});
        };

        /**
         * @param {Object} params
         */
        function getForums(params) {
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
        function createForum(params) {
            Assert.isObject(params, 'Invalid "params" type');
            Assert.isString(params.subject, 'Invalid "params.subject" type');
            return $http.post(API_URL + 'researches/' + params.researchId + '/forums', params);
        };

        /**
         * @param {Object} params
         */
        function updateForum(params) {
            Assert.isObject(params, 'Invalid "params" type');

            return $http.put(API_URL + 'forums/' + params.id, params);
        };

        function deleteForum(id) {
            return $http.delete(API_URL + 'forums/' + id);
        };
    }
})();