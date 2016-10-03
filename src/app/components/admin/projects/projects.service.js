;(function() {
    'use strict';

    angular
        .module('admin.projects')
        .factory('adminProjectsService', adminProjectsService);

    /* ngInject */
    function adminProjectsService($http, API_URL, Assert, Type) {
        return {
            query: query,
            deleteResearch: deleteResearch
        };

        /**
         * @param {Object} params
         */
        function query(params) {
            Assert.isObject(params, 'Invalid "params" type');

            var _createQuery = function(data) {
                var params = [];

                if (!Type.isNull(data.keyword) && data.keyword != '') {
                    var keyword = 'keyword=' + data.keyword;
                    params.push(keyword);
                }

                if (data.page != '') {
                    var page = 'page=' + data.page;
                    params.push(page);
                }
                return params.join('&');
            };
            return $http.get(API_URL + 'queries/researches?' + _createQuery(params));
        };

        /**
         * @param {Number} id
         * @return {Promise}
         */
        function deleteResearch(id) {
            return $http.delete(API_URL + 'researches/' + id);
        }
    }
})();