'use strict';

angular.module('researchApp')
  .controller('ProjectCtrl', function ($scope, $stateParams, $http, Auth, $state) {
    $scope.inviteSent = false;
    $scope.isSupervisor = false;
    $scope.canJoinProject = true;
    $scope.errorMsg = '';
    $scope.project = {};
    $scope.researchersList = [];
    $scope.newResearcher = {};
    $scope.selectedResearcher = {
      user: {}
    };

    $http.get(API_URL + 'researches/' + $stateParams.id).success(function(project) {
      $scope.project = project;
      var user = Auth.getCurrentUser();
      if( user && user._id == project.supervisor.id ){
        $scope.isSupervisor = true;
      }
      if( !user || $scope.isSupervisor ||
          _.any(project.researchers, function(researcher) {
            return researcher.id == user._id;
      }) || _.any(project.pending_join_requests, function(researcher) {
            return researcher.id == user._id;
      })){
        $scope.canJoinProject = false;
      }
    });

    $http.get(API_URL + 'users').success(function(users) {
      $scope.researchersList = _.filter(users, function(user) {
        return user.supervisor_of.length > 0;
      });

      $scope.researchersList.unshift({name: 'None'});
    }).error(function(err) {
      $scope.researchersList.unshift({name: 'None'});
    });;

    $scope.inviteResearcher = function(){
      if(!$scope.newResearcher.email || $scope.newResearcher.email == '' ||
        !$scope.newResearcher.name || $scope.newResearcher.name == '') {
        $scope.errorMsg = 'Required';
        return;
      }
      $http.post(API_URL + 'researches/' + $stateParams.id + '/invite', {
        text: $scope.newResearcher.message ? $scope.newResearcher.message : '',
        email: $scope.newResearcher.email, 
        name: $scope.newResearcher.name ? $scope.newResearcher.name : ''
      }).success(function(){
        $scope.newResearcher = {};
        $scope.inviteSent = true;
        $scope.errorMsg = '';
      });
    };

    $scope.selectResearcher = function() {
      if (!$scope.selectedResearcher) {
        return;
      } else if ($scope.selectedResearcher.user.name = 'None') {
        $scope.newResearcher = {};
        return;
      } else {
        $scope.newResearcher = $scope.selectedResearcher.user;
      }
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
