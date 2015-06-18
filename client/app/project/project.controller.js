'use strict';

angular.module('researchApp')
  .controller('ProjectCtrl', function ($scope, $routeParams, data) {
    angular.forEach(data.projectsList, function(item) {
      if (item.id === $routeParams.id) {
        $scope.project = item;
      }
    });
  });
