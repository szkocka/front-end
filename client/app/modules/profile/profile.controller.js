'use strict';

define(['angular'], function (angular) {
    angular.module('researchApp.Controllers')
        .controller('ProfileCtrl', ['$scope', '$state', '$stateParams', '$http', 'Auth',
        function ($scope, $state, $stateParams, $http, Auth) {
          $scope.userId = $stateParams.id;
          $scope.user = {};
          $scope.area = [];
          $scope.invitations = [];
          $scope.isSupervisor = false;
          $scope.errorMsg = '';
          _init();

          function _init() {
            $http.get(API_URL + 'users/me/invites/researches').success(function(res) {
              $scope.invitations = _.uniq(res.researches);
            });
          }

          $http.get(API_URL + 'users/' + $scope.userId).success(function(res) {
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
            $http.post(API_URL + 'users/me/invites/researches/' + proj.id + '/accepted', {})
            .success(function(){
              _init();
            });
          };

          $scope.ignore = function(proj) {
            $http.post(API_URL + 'users/me/invites/researches/' + proj.id + '/declined', {})
            .success(function(){
              _init();
            });
          };
    }]);
});