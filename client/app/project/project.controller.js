'use strict';

angular.module('researchApp')
  .controller('ProjectCtrl', function ($scope, $routeParams, $http) {
    $http.get(API_URL + 'researches').success(function(projectsList) {
      $scope.projectsList = projectsList;

      angular.forEach(projectsList, function(item) {
        if (item._id === $routeParams.id) {
          $scope.project = item;
        }
      });
    });
  });
