'use strict';

angular.module('researchApp')
  .controller('ProjectCtrl', function ($scope, $stateParams, $http, Auth, $state) {
    $scope.inviteSent = false;
    $scope.isSupervisor = false;
    $scope.canJoinProject = false;
    $scope.project = {};
    $scope.newResearcher = {};
    $scope.joinRequests = [];
    $scope.user = null;
    $scope.errorMsg = '';
    $scope.validationMsg = '';
    _init();

    function _init() {
      $scope.error = '';
      $http.get(API_URL + 'researches/' + $stateParams.id).success(function(project) {
        $scope.project = project;
        $scope.user = Auth.getCurrentUser();
        if( $scope.user && $scope.user._id == project.supervisor.id ){
          $scope.isSupervisor = true;
        }

        if($scope.project.relationship_type === 'NONE') {
          $scope.canJoinProject = true;
        }

        /*if( !$scope.user || $scope.isSupervisor ||
            _.any(project.researchers, function(researcher) {
              return researcher.id == $scope.user._id;
        }) || _.any(project.pending_join_requests, function(researcher) {
              return researcher.id == $scope.user._id;
        })){
          $scope.canJoinProject = false;
        }*/
      });

      $http.get(API_URL + 'researches/' + $stateParams.id + '/requests').success(function(res) {
        $scope.joinRequests = res.users;
        if (_.any($scope.joinRequests, function(request) {
              return request.id == $scope.user._id;
        })) {
          $scope.canJoinProject = false;
        }
      });
    }

    $scope.inviteResearcher = function(){
      if(!$scope.newResearcher.email || $scope.newResearcher.email == '' ||
        !$scope.newResearcher.name || $scope.newResearcher.name == '') {
        $scope.validationMsg = 'Required';
        return;
      }
      $http.post(API_URL + 'researches/' + $stateParams.id + '/invites', {
        text: $scope.newResearcher.message ? $scope.newResearcher.message : '',
        email: $scope.newResearcher.email,
        name: $scope.newResearcher.name ? $scope.newResearcher.name : ''
      }).success(function(){
        $scope.newResearcher = {};
        $scope.inviteSent = true;
        $scope.validationMsg = '';
      }).error(function(message) {
        $scope.inviteSent = false;
        $scope.validationMsg = '';
        $scope.errorMsg = message.message;
      });
    };

    $scope.edit = function() {
      $state.go('add-update-project', {id: $stateParams.id});
    };

    $scope.join = function() {
      $http.post(API_URL + 'researches/' + $stateParams.id + '/requests', {
        text: "DEF"
      }).success(function(data){
        console.log(data.message);
        $scope.canJoinProject = false;
      });
    };

    $scope.accept = function(user) {
      $http.post(API_URL + 'researches/' + $stateParams.id + '/researchers/' + user.id + '/approved', {
      }).success(function(){
        _init();
      }).error(function(error) {
        console.log(error);
      });
    };

    $scope.ignore = function(user) {
      $http.post(API_URL + 'researches/' + $stateParams.id + '/researchers/' + user.id + '/rejected', {
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
