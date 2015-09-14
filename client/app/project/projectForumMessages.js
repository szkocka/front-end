'use strict';

angular.module('researchApp')
  .controller('ProjectForumMessagesCtrl', function ($scope, $stateParams, $http) {
    $http.get(API_URL + 'researches/forums/' + $stateParams.forumId).success(function(forum) {
      $scope.activeForum = forum;
    });

    $scope.newMessage = null;
    $scope.postMessage = function(text){
      $scope.newMessage = null;
      $http.post(API_URL + 'researches/forums/' + $stateParams.forumId, {
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
