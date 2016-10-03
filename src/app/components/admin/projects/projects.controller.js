;(function() {
    'use strict';

    angular
        .module('admin.projects')
        .controller('AdminProjectsController', AdminProjectsController);

    /* ngInject */
    function AdminProjectsController($scope, adminProjectsService, LOAD_LIMIT, Assert, $mdToast) {
        /** @public {Array<Object>} */
        $scope.projectsList = [];
        /** @public {Boolean} */
        $scope.loadMoreAvailable = true;
        /** @private {Object} */
        $scope.searchParams = {
            keyword: null,
            page: 0
        };
        /** @public {Boolean} */
        $scope.isLoading = true;

        $scope._init = _init;
        $scope.loadMore = loadMore;
        $scope.search = search;
        $scope.deleteProject = deleteProject;

        function loadMore() {
            if($scope.loadMoreAvailable) {
                $scope._init();
            }
        };

        function _init() {
            $scope.isLoading = true;
            adminProjectsService.query($scope.searchParams)
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

        function search(e) {
            if (e.keyCode === 13) {
                $scope.projectsList = [];
                $scope.searchParams.page = 0;
                $scope.loadMoreAvailable = true;
                $scope._init();
            }
        };

        /**
         * @param {Object} project
         */
        function deleteProject(project) {
            Assert.isObject(project, 'Invalid "project" type');

            adminProjectsService.deleteResearch(project.id)
                .then(function(res) {

                    _.remove($scope.projectsList, function(item) {
                        return item.id === project.id;
                    });

                }, function(err) {
                    console.log(err);
                });
        };

        $scope._init();
    }
})();