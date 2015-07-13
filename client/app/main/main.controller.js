'use strict';

angular.module('researchApp')
  .controller('MainCtrl', function ($scope, $http, socket) {

    $scope.carouselInterval = 5000;
    $scope.projectsList = [];

    $http.get('/api/projects').success(function(projectsList) {
      $scope.projectsList = projectsList;
      socket.syncUpdates('project', $scope.projectsList);
    });

  });