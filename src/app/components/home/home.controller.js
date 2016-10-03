;(function() {
    'use strict';

    angular
        .module('home')
        .controller('HomeController', HomeController);

    /* ngInject */
    function HomeController($scope, homeService, LOAD_LIMIT, Assert, Type, $mdToast) {
        /** @public {Array<Object>} */
        $scope.projectsList = [];
        /** @private {Array<Object>} */
        $scope.tag = [];
        /** @public {Boolean} */
        $scope.showTagsShortList = true;
        /** @public {Boolean} */
        $scope.loadMoreAvailable = true;
        /** @private {Object} */
        $scope.searchParams = {
            keyword: null,
            status: 'active',
            tag: null,
            page: 0
        };
        /** @public {Boolean} */
        $scope.showSearchInput = false;
        /** @private {String} */
        $scope.currentNavItem = 'active';
        /** @public {Boolean} */
        $scope.isLoading = true;
        /** @public {Boolean} */
        $scope.tagsAreVisible = false;

        $scope._getTags = _getTags;
        $scope._init = _init;
        $scope.loadMore = loadMore;
        $scope.showActiveProjects = showActiveProjects;
        $scope.showAllProjects = showAllProjects;
        $scope.search = search;
        $scope.showTags = showTags;
        $scope.clearTag = clearTag;
        $scope.activateTag = activateTag;

        function _getTags() {
            homeService.getTags()
                .then(function(res) {
                    $scope.tags = _.uniq(res.data.tags);
                }, function(err) {
                    console.log(err.message);
                });
        };

        function loadMore() {
            if($scope.loadMoreAvailable) {
                $scope._init();
            }
        };

        function _init() {
            $scope.isLoading = true;
            homeService.query($scope.searchParams)
                .then(function(res) {
                    $scope.isLoading = false;

                    if (res.data.researches.length < LOAD_LIMIT) {
                        $scope.loadMoreAvailable = false;
                    }

                    if(_.find($scope.projectsList, function(proj) {
                        return res.data.researches.length > 0 && proj.id == res.data.researches[0].id; })
                        ) {
                        return;
                    }

                    res.data.researches.forEach(function(proj){
                        $scope.projectsList.push(proj);
                    });
                    $scope.searchParams.page = $scope.searchParams.page + 1;

                }, function(err) {
                    $scope.isLoading = false;
                    $scope.loadMoreAvailable = false;
                });
        };

        function showActiveProjects() {
            $scope.projectsList = [];
            $scope.searchParams.page = 0;
            $scope.searchParams.keyword = null;
            $scope.searchParams.tag = null;
            $scope.searchParams.status = 'active';
            $scope.loadMoreAvailable = true;
            $scope.tagsAreVisible = false;
            $scope._init();
        };

        function showAllProjects() {
            $scope.projectsList = [];
            $scope.searchParams.page = 0;
            $scope.searchParams.keyword = null;
            $scope.searchParams.status = null;
            $scope.searchParams.tag = null;
            $scope.loadMoreAvailable = true;
            $scope.tagsAreVisible = false;
            $scope._init();
        };

        function search(e) {
            if (e.keyCode === 13) {
                $scope.projectsList = [];
                $scope.searchParams.page = 0;
                $scope.searchParams.tag = null;
                $scope.loadMoreAvailable = true;
                $scope._init();
            }
        };

        function showTags() {
            $scope.tagsAreVisible = true;
        };

        function clearTag() {
            $scope.projectsList = [];
            $scope.searchParams.page = 0;
            $scope.searchParams.keyword = null;
            $scope.searchParams.tag = null;
            $scope.loadMoreAvailable = true;
            $scope._init();
        };

        /**
         * @param {String} tag
         */
        function activateTag(tag) {
            $scope.projectsList = [];
            $scope.searchParams.page = 0;
            $scope.searchParams.keyword = null;
            $scope.searchParams.status = null;
            $scope.searchParams.tag = tag;
            $scope.loadMoreAvailable = true;
            $scope._init();
        };

        $scope._init();
        $scope._getTags();
    }
})();