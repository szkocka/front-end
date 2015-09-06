'use strict';

angular.module('researchApp')
  .controller('ProjectCtrl', function ($scope, $stateParams, $http, Auth) {
    $scope.forums = [];
    $scope.activeForum = null;
    $scope.forumsAccessError = true;
    $scope.inviteSent = false;

    $http.get(API_URL + 'researches/' + $stateParams.id).success(function(project) {
      $scope.project = project;
      var user = Auth.getCurrentUser();
      if( user && user._id == project.supervisor.id ){
        $scope.isSupervisor = true;
      }
    });

    function getForums(){
      $http.get(API_URL + 'researches/' + $stateParams.id + '/forums').success(function(forums) {
        $scope.forumsAccessError = false;
        $scope.forums = forums.forums;
      }).error(function(){
        $scope.forumsAccessError = true;
      });
    }

    $scope.setActiveForum = function(forum){
      $scope.activeForum = forum;
      $http.get(API_URL + 'researches/forums/' + forum._id).success(function(forum) {
        $scope.activeForum.messages = forum.messages;
      });
    };
    $scope.disableActiveForum = function(){
      $scope.activeForum = null;
      getForums();
    };

    $scope.inviteResearcher = function(email){
      $http.post(API_URL + 'researches/' + $stateParams.id + '/invite', {
        text: '',
        email: email
      }).success(function(){
        $scope.newResearcher = '';
        $scope.inviteSent = true;
      });
    }

    $scope.createForum = function(topic){
      $http.post(API_URL + 'researches/' + $stateParams.id + '/forums', {
        subject: topic
      }).success(function(forum){
        forum._id = forum.forum_id;
        $scope.setActiveForum(forum);
      });
    }

    $scope.newMessage = null;
    $scope.postMessage = function(text){
      $scope.newMessage = null;
      $http.post(API_URL + 'researches/forums/' + $scope.activeForum._id, {
        'message': text
      }).success(function(response){
        $scope.activeForum.messages.push({
          message: text,
          createdBy: {name:'You'},
          created: new Date()
        })
      })
    }

    Auth.isLoggedInAsync(function(login){
      if(login)
        getForums();
    });
  });
