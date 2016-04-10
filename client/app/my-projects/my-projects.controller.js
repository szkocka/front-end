'use strict';

angular.module('researchApp')
  .controller('MyProjectsCtrl', function ($scope, $http, Auth) {

    $scope.user = {};

    $http.get(API_URL + 'users/' + Auth.getCurrentUser()._id).success(function(res){
      $scope.user = res;
    });
  });
