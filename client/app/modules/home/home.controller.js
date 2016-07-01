'use strict';
define(['angular'], function (angular) {
    angular.module('researchApp.Controllers')
        .controller('HomeCtrl', ['$scope', '$rootScope', '$timeout', '$http',
        function ($scope, $rootScope, $timeout, $http) {
          $scope.carouselInterval = 5000;
          $scope.projectsList = [];
          $scope.tags = [];
          $scope.viewTags = [];
          $scope.tagsShortListQty = 15;
          $scope.showTagsShortList = true;
          $scope.loadMoreAvailable = true;
          $scope.limit = 20;
          $scope.filterEventName = 'projectsFilter';

          $scope.searchParams = {
            keyword: '',
            status: 'active',
            tag: '',
            page: 0
          };

          _init();

          $http.get(API_URL + 'researches/tags').success(function(res) {
            $scope.tags = _.uniq(res.tags);

            if ($scope.tags.length > $scope.tagsShortListQty) {
              getTagsToShow();
            } else {
              $scope.viewTags = $scope.tags;
            }
          });

          $scope.loadMore = function() {
            if($scope.loadMoreAvailable) {
              _init();
            }
          };

          function _init() {
            var query = createQuery();
            $http.get(API_URL + 'queries/researches?'+ query).success(function(response) {
              if(_.find($scope.projectsList, function(proj) {
                return proj.id == response.researches[0].id; })
                ) {
                return;
              }
              if (response.researches.length < $scope.limit) {
                $scope.loadMoreAvailable = false;
              }

              response.researches.forEach(function(proj){
                $scope.projectsList.push(proj);
              });

              $scope.latest5 = _.first($scope.projectsList, 5);
              $scope.searchParams.page = $scope.searchParams.page + 1;

      //        $timeout(function() {
                $rootScope.$broadcast($scope.filterEventName);  // fire event to redraw main image slider carousel
      //        });

            }).error(function(){
              $scope.loadMoreAvailable = false;
            });
          }

          function createQuery() {
            var params = [];
            if ($scope.searchParams.keyword != '') {
              var keyword = 'keyword=' + $scope.searchParams.keyword;
              params.push(keyword);
            }

            if ($scope.searchParams.status != '') {
              var status = 'status=' + $scope.searchParams.status;
              params.push(status);
            }

            if ($scope.searchParams.tag != '') {
              var tag = 'tag=' + $scope.searchParams.tag;
              params.push(tag);
            }

            if ($scope.searchParams.page != '') {
              var page = 'page=' + $scope.searchParams.page;
              params.push(page);
            }
            return params.join('&');
          }

          $scope.showActiveProjects = function() {
            $scope.projectsList = [];
            $scope.searchParams.page = 0;
            $scope.searchParams.keyword = '';
            $scope.searchParams.status = 'active';
            $scope.loadMoreAvailable = true;
            _init();
          };

          $scope.showAllProjects = function() {
            $scope.projectsList = [];
            $scope.searchParams.page = 0;
            $scope.searchParams.keyword = '';
            $scope.searchParams.status = '';
            $scope.loadMoreAvailable = true;
            _init();
          };

          $scope.search = function() {
            $scope.projectsList = [];
            $scope.searchParams.page = 0;
            $scope.searchParams.tag = '';
            $scope.loadMoreAvailable = true;
            _init();
          };

          $scope.clearTag = function() {
            $scope.projectsList = [];
            $scope.searchParams.page = 0;
            $scope.searchParams.keyword = '';
            $scope.searchParams.tag = '';
            $scope.loadMoreAvailable = true;
            _init();
          };

          $scope.activateTag = function(tag) {
            $scope.projectsList = [];
            $scope.searchParams.page = 0;
            $scope.searchParams.keyword = '';
            $scope.searchParams.tag = tag;
            $scope.loadMoreAvailable = true;
            _init();
          };

          $scope.showAllTags = function () {
            $scope.viewTags = $scope.tags;
            $scope.showTagsShortList = false;
          };

          $scope.showLessTags = function () {
            getTagsToShow();
            $scope.showTagsShortList = true;
          };

          function getTagsToShow() {
            $scope.viewTags = [];
            for (var i = 0; i < $scope.tagsShortListQty; i++) {
              $scope.viewTags.push($scope.tags[i]);
            };
          }
    }]);
});