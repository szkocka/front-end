'use strict';

angular.module('researchApp')
  .controller('MyProjectsCtrl', function ($scope, $http, $stateParams, Auth) {

    $scope.user = {};
    $scope.userId = $stateParams.id;
    $http.get(API_URL + 'users/' + $scope.userId).success(function(res){
      $scope.user = res;
    });
  });
