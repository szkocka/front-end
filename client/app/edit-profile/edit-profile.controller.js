'use strict';

angular.module('researchApp')
  .controller('EditProfileCtrl', function ($scope, $http, $state, Auth) {
    $scope.userInfo = Auth.getCurrentUser();
    $scope.user = {};
    
    $http.get(API_URL + 'users/' + $scope.userInfo._id).success(function(user) {
      $scope.user = user;
    });

    $scope.save = function() {
      $http.put(API_URL + 'users/' + $scope.userInfo._id,
        {
          cv: $scope.user.cv
        }).success(function(data){
          $state.go('profile', {id: $scope.userInfo._id});
      });
    }
  });
