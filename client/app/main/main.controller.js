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

    $http.get(API_URL + 'researches').success(function(projectsList) {
      allProjects = _(projectsList.researches).reverse().value();
      $scope.projectsList = _.clone(allProjects);
      $scope.latest5 = _.first(allProjects, 5);

      $http.get(API_URL + 'researches/tags').success(function(res) {
        $scope.tags = res.tags;

        if ($scope.tags.length > $scope.tagsShortListQty) {
          getTagsToShow();
        } else {
          $scope.viewTags = $scope.tags;
        }
      });
    });

    $scope.clearTag = function(){
      $scope.activeTag = null;
      $scope.projectsList = _.clone(allProjects);
    };

    $scope.activateTag = function(tag){
      $scope.projectsList = _.filter(allProjects, function(project){
        return _.indexOf(project.tags, tag) > -1;
      });
      $scope.activeTag = tag;
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
