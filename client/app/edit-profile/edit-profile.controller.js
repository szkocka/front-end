'use strict';

angular.module('researchApp')
  .controller('EditProfileCtrl', function ($scope, $http, $state, $stateParams, Auth) {

    $scope.userId = $stateParams.id;
    $scope.user = {};
    
    $http.get(API_URL + 'users/' + $scope.userId).success(function(user) {
      $scope.user = user;
    });

    $scope.save = function() {
      $http.put(API_URL + 'users',
        {
          cv: $scope.user.cv,
          name: $scope.user.name
        }).success(function(data){
          $state.go('profile', {id: $scope.userId});
      });
    }
  });
