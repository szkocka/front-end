;(function() {
    'use strict';

    angular
        .module('news')
        .controller('NewsController', NewsController);

    /* ngInject */
    function NewsController($scope, $state, newsService, accountService, LOAD_LIMIT, Assert, Type) {
        /** @public {Boolean} */
        $scope.showAddButton = accountService.isAdmin();
        /** @public {Array<Object>} */
        $scope.news = [];
        /** @private {String} */
        $scope.cursor = null;
        /** @private {Boolean} */
        $scope.loadMoreAvailable = true;
        /** @public {Boolean} */
        $scope.isLoading = true;

        $scope._init = _init;
        $scope.loadMore = loadMore;
        $scope.addNews = addNews;

       function loadMore() {
            if($scope.loadMoreAvailable) {
                $scope._init();
            }
        };

        function _init() {
            $scope.isLoading = true;
            newsService.get($scope.cursor)
                .then(function(res){
                    $scope.isLoading = false;
                    if ($scope.cursor === res.data.cursor) {
                        return;
                    }
                    if (res.data.news.length < LOAD_LIMIT) {
                        $scope.loadMoreAvailable = false;
                    }
                    $scope.cursor = res.data.cursor;

                    res.data.news.forEach(function(el) {
                        // create view object
                        var tmpObj = {};
                        tmpObj.viewNews = el;
                        tmpObj.showMore = true;

                        $scope.news.push(tmpObj);
                    });
                }, function(err) {
                    $scope.isLoading = false;
                    $scope.loadMoreAvailable = false;
                });

        };


        function addNews() {
            $state.go('news-add');
        };

        $scope._init();
    }
})();