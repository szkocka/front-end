;(function() {
    'use strict';

    angular
        .module('home')
        .factory('homeService', homeService);

    /* ngInject */
    function homeService($http, API_URL, Assert, Type) {
        return {
            getTags: getTags,
            query: query
        };

        function getTags() {
            return $http.get(API_URL + 'researches/tags');
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

                if (!Type.isNull(data.status)) {
                    var status = 'status=' + data.status;
                    params.push(status);
                }

                if (!Type.isNull(data.tag)) {
                    var tag = 'tag=' + data.tag;
                    params.push(tag);
                }

                if (data.page != '') {
                    var page = 'page=' + data.page;
                    params.push(page);
                }
                return params.join('&');
            };
            return $http.get(API_URL + 'queries/researches?' + _createQuery(params));
        };
    }
})();