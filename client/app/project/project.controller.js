'use strict';

angular.module('researchApp')
  .controller('ProjectCtrl', function ($scope, $stateParams, $http, Auth, $state) {
    $scope.inviteSent = false;
    $scope.isSupervisor = false;
    $scope.canJoinProject = true;
    $scope.project = {};

    $http.get(API_URL + 'researches/' + $stateParams.id).success(function(project) {
      $scope.project = project;
      var user = Auth.getCurrentUser();
      if( user && user._id == project.supervisor.id ){
        $scope.isSupervisor = true;
      }
      if( !user || user && user._id == project.supervisor.id ||
          _.any(project.researchers, function(researcher) {
            return researcher.id == user._id;
      })){
        $scope.canJoinProject = false;
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
    };

    $scope.edit = function() {
      $state.go('add-update-project', {id: $stateParams.id});
    };

    $scope.join = function() {
      $http.post(API_URL + 'researches/' + $stateParams.id + '/join', {
        text: "DEF"
      }).success(function(data){
        console.log(data.message);
        $scope.canJoinProject = false;
      });
    };

    $scope.detectStatus = function() {
      if($scope.project.status == 'active') {
        return 'ACTIVE';
      } else if ($scope.project.status == 'closed') {
        return 'CLOSED';
      } else {
        return 'ON HOLD';
      }
    };
  });
