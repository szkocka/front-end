'use strict';

angular.module('researchApp')
  .controller('MainCtrl', function ($scope, $http) {

    var allProjects;

    $scope.carouselInterval = 5000;
    $scope.projectsList = [];

    $http.get(API_URL + 'researches').success(function(projectsList) {
      $scope.projectsList = projectsList.researches;
      allProjects = _.clone($scope.projectsList);
      $scope.tags = _.chain(projectsList.researches)
        .map(function(r){
          return r.tags;
        })
        .flatten()
        .uniq()
        .sortBy()
        .value()
    });

    $scope.activateTag = function(tag){
      $scope.projectsList = _.filter(allProjects, function(project){
        return _.indexOf(project.tags, tag) > -1;
      });
      $scope.activeTag = tag;
    }

  });
