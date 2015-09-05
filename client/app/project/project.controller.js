'use strict';

angular.module('researchApp')
  .controller('ProjectCtrl', function ($scope, $routeParams, $http) {
    $scope.forums = [];
    $scope.activeForum = null;

    $http.get(API_URL + 'researches/' + $routeParams.id).success(function(project) {
      $scope.project = project;
    });

    $http.get(API_URL + 'researches/' + $routeParams.id + '/forums').success(function(forums) {
      $scope.forums = forums.forums;
    });

    $scope.setActiveForum = function(forum){
      $scope.activeForum = forum;
      $http.get(API_URL + 'researches/forums/' + forum._id).success(function(forum) {
        $scope.activeForum.messages = forum.messages;
      });
    };
    $scope.disableActiveForum = function(){
      $scope.activeForum = null;
    };

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
  });
