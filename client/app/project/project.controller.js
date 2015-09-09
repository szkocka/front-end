'use strict';

angular.module('researchApp')
  .controller('ProjectCtrl', function ($scope, $stateParams, $http, Auth, $state) {
    $scope.inviteSent = false;

    $http.get(API_URL + 'researches/' + $stateParams.id).success(function(project) {
      $scope.project = project;
      var user = Auth.getCurrentUser();
      if( user && user._id == project.supervisor.id ){
        $scope.isSupervisor = true;
      }
    });

    $scope.inviteResearcher = function(email){
      $http.post(API_URL + 'researches/' + $stateParams.id + '/invite', {
        text: '',
        email: email
      }).success(function(){
        $scope.newResearcher = '';
        $scope.inviteSent = true;
      });
    }

    $state.go('project.about');
  });
