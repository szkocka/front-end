'use strict';

angular.module('researchApp')
  .controller('ProjectCtrl', function ($scope, $routeParams, $http) {
    var mainForum;

    $http.get(API_URL + 'researches/' + $routeParams.id).success(function(project) {
      $scope.project = project;
    });

    $http.get(API_URL + 'researches/' + $routeParams.id + '/forums').success(function(forums) {
      mainForum = forums.forums[0];
      if( mainForum && mainForum._id ) {
        $http.get(API_URL + 'researches/forums/' + mainForum._id).success(function(forum) {
          $scope.forum = forum;
        });
      }
    });

    $scope.newMessage = null;
    $scope.postMessage = function(text){
      $scope.newMessage = null;
      $http.post(API_URL + 'researches/forums/' + mainForum._id, {
        'message': text
      }).success(function(response){
        $scope.forum.messages.push({
          message: text,
          createBy: 'You',
          created: new Date()
        })
      })
    }
  });
