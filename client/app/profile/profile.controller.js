'use strict';

angular.module('researchApp')
  .controller('ProfileCtrl', function ($scope, $state, $stateParams, $http, Auth) {
    $scope.userId = $stateParams.id;
    $scope.user = {};
    $scope.area = [];
    $scope.invitations = [];
    $scope.isSupervisor = false;
    $scope.errorMsg = '';
    _init();

    function _init() {
      $http.get(API_URL + 'users/me/invites').success(function(res) {
        $scope.invitations = _.uniq(res.invitations);
      });
    }

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
      $http.post(API_URL + 'users/me/invites/' + proj.id + '/accepted', {})
      .success(function(){
        _init();
      });
    };

    $scope.ignore = function(proj) {
      $http.post(API_URL + 'users/me/invites/' + proj.id + '/rejected', {})
      .success(function(){
        _init();
      });
    };
});
