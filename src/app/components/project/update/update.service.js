;(function() {
    'use strict';

    angular
        .module('project-update')
        .factory('updateProjectService', updateProjectService);

    /* ngInject */
    function updateProjectService($http, API_URL, Assert, Type) {
        return {
            getProjectById: getProjectById,
            update: update,
            removeResearcher: removeResearcher,
            changeSupervisor: changeSupervisor,
            addResearcher: addResearcher
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
        function removeResearcher(params) {
            Assert.isObject(params, 'Invalid "params" type');
            return $http.delete(API_URL + 'researches/' + params.researchId + '/researchers/' + params.researcherId);
        };

        /**
         * @param {Object} params
         */
        function changeSupervisor(params) {
            Assert.isObject(params, 'Invalid "params" type');
            return $http.put(API_URL + 'researches/' + params.researchId + '/supervisor', params);
        };

        /**
         * @param {Object} params
         */
        function addResearcher(params) {
            Assert.isObject(params, 'Invalid "params" type');
            return $http.post(API_URL + 'researches/' + params.researchId + '/researchers', params);
        };

    }
})();