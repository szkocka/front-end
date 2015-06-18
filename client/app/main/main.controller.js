'use strict';

angular.module('researchApp')
  .controller('MainCtrl', function ($scope, data) {

    $scope.tags = data.tags;
    $scope.projects = data.projectsList;

    $scope.carouselInterval = 5000;

  });
