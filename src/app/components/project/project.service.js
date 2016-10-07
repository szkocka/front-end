;(function() {
    'use strict';

    angular
        .module('project')
        .factory('projectService', projectService);

    /* ngInject */
    function projectService($http, API_URL, Assert, Type) {
        return {
            getProjectById: getProjectById,
            update: update,
            sendInvitation: sendInvitation,
            removeResearcher: removeResearcher,
            getJoinRequests: getJoinRequests,
            joinResearch: joinResearch,
            aproveResearcher: aproveResearcher,
            rejectResearcher: rejectResearcher,
            getUserProfile: getUserProfile,
            getForums: getForums,
            createForum: createForum
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
        function update(params) {
            Assert.isObject(params, 'Invalid "params" type');
            return $http.put(API_URL + 'researches/' + params.researchId, params);
        };

        /**
         * @param {Object} params
         */
        function sendInvitation(params) {
            Assert.isObject(params, 'Invalid "params" type');
            return $http.post(API_URL + 'researches/' + params.researchId + '/invites', params);
        };

        /**
         * @param {Object} params
         */
        function removeResearcher(params) {
            Assert.isObject(params, 'Invalid "params" type');
            return $http.delete(API_URL + 'researches/' + params.researchId + '/researchers/' + params.researcherId);
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
         * @param {Number} id
         */
        function getUserProfile(id) {
            return $http.get(API_URL + 'users/' + id);
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
    }
})();