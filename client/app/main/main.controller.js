'use strict';

angular.module('researchApp')
  .controller('MainCtrl', function ($scope, $http) {

    $scope.carouselInterval = 5000;
    $scope.projectsList = [];

    $http.get(API_URL + 'researches').success(function(projectsList) {
      $scope.projectsList = projectsList;
    });

  });