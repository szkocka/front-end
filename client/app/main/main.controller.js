'use strict';

angular.module('researchApp')
  .controller('MainCtrl', function ($scope, $http) {

    var allProjects;

    $scope.carouselInterval = 5000;
    $scope.projectsList = [];

    $http.get(API_URL + 'researches').success(function(projectsList) {
      allProjects = _(projectsList.researches).reverse().value();
      $scope.projectsList = _.clone(allProjects);
      $scope.latest5 = _.first(allProjects, 5);

      $scope.tags = _.chain(projectsList.researches)
        .map(function(r){
          return r.tags;
        })
        .flatten()
        .uniq()
        .sortBy()
        .value()
    });

    $scope.clearTag = function(){
      $scope.activeTag = null;
      $scope.projectsList = _.clone(allProjects);
    }

    $scope.activateTag = function(tag){
      $scope.projectsList = _.filter(allProjects, function(project){
        return _.indexOf(project.tags, tag) > -1;
      });
      $scope.activeTag = tag;
    }

  });
