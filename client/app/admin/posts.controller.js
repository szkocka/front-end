'use strict';

angular.module('researchApp')
  .controller('PostsCtrl', function ($scope, $http, $stateParams) {
    $scope.userId = $stateParams.userId;
  });
