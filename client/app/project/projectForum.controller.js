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
        if (res.researches.length < $scope.limit) {
          $scope.loadMoreAvailable = false;
        }
        $scope.cursor = res.cursor;
        res.researches.forEach(function(forum) {
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
        forum._id = forum.forum_id;
        //$scope.setActiveForum(forum);
        $state.go('project.forum.one', {forumId: forum._id})
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
