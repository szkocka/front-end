'use strict';

angular.module('researchApp')
  .controller('ProjectCtrl', function ($scope, $routeParams, $http, Auth) {
    $scope.forums = [];
    $scope.activeForum = null;
    $scope.forumsAccessError = true;

    $http.get(API_URL + 'researches/' + $routeParams.id).success(function(project) {
      $scope.project = project;
      var user = Auth.getCurrentUser();
      if( user && user._id == project.supervisor.id ){
        $scope.canCreateForum = true;
      }
    });

    function getForums(){
      $http.get(API_URL + 'researches/' + $routeParams.id + '/forums').success(function(forums) {
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

    $scope.createForum = function(topic){
      $http.post(API_URL + 'researches/' + $routeParams.id + '/forums', {
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
