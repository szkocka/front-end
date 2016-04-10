'use strict';

angular.module('researchApp')
  .controller('MyProjectsCtrl', function ($scope, $http, Auth) {

    $scope.user = {};
    $scope.userInfo = Auth.getCurrentUser();
    $http.get(API_URL + 'users/' + $scope.userInfo._id).success(function(res){
      $scope.user = res;
    });
  });
