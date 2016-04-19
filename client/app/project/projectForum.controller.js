'use strict';

angular.module('researchApp')
  .controller('ProjectForumCtrl', function ($scope, $stateParams, $http, Auth, $state) {
    $scope.forums = [];
    $scope.forumsAccessError = true;
    $scope.cursor = '';
    $scope.loadMoreAvailable = true;
    $scope.limit = 3;
    _init();

    $scope.loadMore = function() {
      if($scope.loadMoreAvailable) {
        _init();
      }
    };

    function getForums(){
      var query;
      if ($scope.cursor == '') {
        query = '/forums';
      } else {
        query = '/forums?cursor=' + $scope.cursor;
      }
      $http.get(API_URL + 'researches/' + $stateParams.id + query).success(function(res) {
        $scope.forumsAccessError = false;
        if ($scope.cursor == res.cursor) {
          return;
        }
        if (res.forums.length < $scope.limit) {
          $scope.loadMoreAvailable = false;
        }
        $scope.cursor = res.cursor;
        res.forums.forEach(function(forum) {
          $scope.forums.push(forum);
        });
      }).error(function(){
        $scope.loadMoreAvailable = false;
      });
    }

    $scope.createForum = function(topic){
      $http.post(API_URL + 'researches/' + $stateParams.id + '/forums', {
        subject: topic
      }).success(function(forum){
        forum.id = forum.forum_id;
        $state.go('project.forum.one', {forumId: forum.id})
      });
    }

    function _init() {
      Auth.isLoggedInAsync(function(login){
        if(login) {
          getForums();
        } else {
          $scope.forumsAccessError = true;
        }
      });
    }
  });
