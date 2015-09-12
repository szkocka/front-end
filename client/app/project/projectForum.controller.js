'use strict';

angular.module('researchApp')
  .controller('ProjectForumCtrl', function ($scope, $stateParams, $http, Auth, $state) {
    $scope.forums = [];
    $scope.forumsAccessError = false;

    function getForums(){
      $http.get(API_URL + 'researches/' + $stateParams.id + '/forums').success(function(forums) {
        $scope.forumsAccessError = false;
        $scope.forums = forums.forums;
      }).error(function(){
        $scope.forumsAccessError = true;
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

    Auth.isLoggedInAsync(function(login){
      if(login)
        getForums();
    });
  });
