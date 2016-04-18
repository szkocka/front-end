'use strict';

angular.module('researchApp')
  .controller('MainCtrl', function ($scope, $http) {

    var allProjects;

    $scope.carouselInterval = 5000;
    $scope.projectsList = [];
    $scope.tags = [];
    $scope.viewTags = [];
    $scope.tagsShortListQty = 15;
    $scope.showTagsShortList = true;
    $scope.loadMoreAvailable = true;
    $scope.limit = 3;

    $scope.searchParams = {
      keyword: '',
      status: 'active',
      tag: '',
      cursor: ''
    };

    _init();

    $http.get(API_URL + 'researches/tags').success(function(res) {
      $scope.tags = res.tags;

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
      $http.get(API_URL + 'researches?'+ query).success(function(response) {
        if ($scope.searchParams.cursor === response.cursor) {
          return;
        }
        if (response.researches.length < $scope.limit) {
          $scope.loadMoreAvailable = false;
        }
        allProjects = _(response.researches).reverse().value();
        allProjects.forEach(function(proj){
          $scope.projectsList.push(proj);
        });

        $scope.latest5 = _.first(allProjects, 2);
        $scope.searchParams.cursor = response.cursor;

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

      if ($scope.searchParams.cursor != '') {
        var cursor = 'cursor=' + $scope.searchParams.cursor;
        params.push(cursor);
      }
      return params.join('&');
    }

    $scope.showActiveProjects = function() {
      $scope.projectsList = [];
      $scope.searchParams.cursor = '';
      $scope.searchParams.keyword = '';
      $scope.searchParams.status = 'active';
      _init();
    };

    $scope.showAllProjects = function() {
      $scope.projectsList = [];
      $scope.searchParams.cursor = '';
      $scope.searchParams.keyword = '';
      $scope.searchParams.status = '';
      _init();
    };

    $scope.search = function() {
      $scope.projectsList = [];
      $scope.searchParams.cursor = '';
      $scope.searchParams.tag = '';
      _init();
    };

    $scope.clearTag = function() {
      $scope.projectsList = [];
      $scope.searchParams.cursor = '';
      $scope.searchParams.keyword = '';
      $scope.searchParams.tag = '';
      _init();
    };

    $scope.activateTag = function(tag) {
      $scope.projectsList = [];
      $scope.searchParams.cursor = '';
      $scope.searchParams.keyword = '';
      $scope.searchParams.tag = tag;
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
  });
