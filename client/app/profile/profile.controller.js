'use strict';

angular.module('researchApp')
  .controller('ProfileCtrl', function ($scope, $state, $stateParams, $http, Auth) {
    $scope.userId = $stateParams.id;
    $scope.user = {};
    $scope.area = [];
    $scope.isSupervisor = false;

    $http.get(API_URL + '/users/' + $scope.userId).success(function(res) {
      $scope.isSupervisor = (Auth.getCurrentUser()._id == $scope.userId);
      $scope.user = res;
      if (!_.isEmpty($scope.user.supervisor_of)){
        var area = []; 
        $scope.user.supervisor_of.forEach(function(proj) {
          area.push(proj.area);
        });
        $scope.area = _.uniq(area)
      }
    });

    $scope.edit = function() {
      $state.go('edit-profile', {id: $scope.userId});
    };

    $scope.accept = function(proj) {
      console.log('accept');
    };

    $scope.ignore = function(proj) {
      console.log('ignore');
    };
});