;(function() {
    'use strict';

    angular
        .module('admin.projects')
        .controller('AdminProjectsController', AdminProjectsController);

    /* ngInject */
    function AdminProjectsController($scope, adminProjectsService, LOAD_LIMIT, Assert,
    $mdToast, dialogService) {
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
        $scope.confirmDelete = confirmDelete;
        $scope._deleteProject = _deleteProject;

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
         * @param {Object} proj
         * @param {Object} ev
         */
        function confirmDelete(proj, ev) {
            var title = 'Delete this project?';
            var message = proj.title;
            var button = 'DELETE';
            var callback = $scope._deleteProject;

            dialogService.confirm(title, message, button, callback, ev, proj);
        };

        /**
         * @param {Object} project
         */
        function _deleteProject(project) {
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