'use strict';

angular.module('researchApp')
  .controller('ProjectCtrl', function ($scope, $routeParams, $http, socket) {
    $http.get('/api/projects').success(function(projectsList) {
      $scope.projectsList = projectsList;
      socket.syncUpdates('project', $scope.projectsList);

      angular.forEach(projectsList, function(item) {
        if (item._id === $routeParams.id) {
          $scope.project = item;
        }
      });
    });

    
  });
