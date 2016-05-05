'use strict';

angular.module('researchApp')
  .controller('ProjectCtrl', function ($scope, $stateParams, $http, Auth, $state) {
    $scope.inviteSent = false;
    $scope.isSupervisor = false;
    $scope.canJoinProject = true;
    $scope.errorMsg = '';
    $scope.project = {};
    $scope.newResearcher = {};
    _init();

    function _init() {
      $scope.error = '';
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
    }

    $scope.inviteResearcher = function(){
      if(!$scope.newResearcher.email || $scope.newResearcher.email == '' ||
        !$scope.newResearcher.name || $scope.newResearcher.name == '') {
        $scope.errorMsg = 'Required';
        return;
      }
      $http.post(API_URL + 'researches/' + $stateParams.id + '/invites', {
        text: $scope.newResearcher.message ? $scope.newResearcher.message : '',
        email: $scope.newResearcher.email,
        name: $scope.newResearcher.name ? $scope.newResearcher.name : ''
      }).success(function(){
        $scope.newResearcher = {};
        $scope.inviteSent = true;
        $scope.errorMsg = '';
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

    $scope.accept = function(user) {
      console.log('accept');
      return;
      $http.post(API_URL + 'researches/' + $stateParams.id + '/accept/' + user.id, {
      }).success(function(){
        _init();
      }).error(function(error) {
        console.log(error);
      });
    };

    $scope.ignore = function(user) {
      console.log('ignore');
      return;
      $http.post(API_URL + 'researches/' + $stateParams.id + '/ignore/' + user.id, {
      }).success(function(){
        _init();
      }).error(function(error) {
        console.log(error);
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
