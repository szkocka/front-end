'use strict';

angular.module('researchApp')
  .controller('ProjectForumMessagesCtrl', function ($scope, $stateParams, $http) {
    $scope.newMessage = null;
    $scope.activeForum = {};
    $scope.activeForumMessages = [];
    $scope.cursor = '';
    $scope.loadMoreAvailable = true;
    $scope.limit = 3;
    _init();

    $http.get(API_URL + 'forums/' + $stateParams.forumId).success(function(forum) {
      $scope.activeForum = forum;
    });

    $scope.loadMore = function() {
      if($scope.loadMoreAvailable) {
        _init();
      }
    };

    function _init() {
      var query;
      if (!$scope.cursor || $scope.cursor == '') {
        query = 'forums/' + $stateParams.forumId + '/messages';
      } else {
        query = 'forums/' + $stateParams.forumId + '/messages?cursor=' + $scope.cursor;
      }
      $http.get(API_URL + query).success(function(res) {
        if ($scope.cursor == res.cursor) {
          return;
        }
        if (res.messages.length < $scope.limit) {
          $scope.loadMoreAvailable = false;
        }
        $scope.cursor = res.cursor;
        res.messages.forEach(function(msg) {
          $scope.activeForumMessages.push(msg);
        });
      }).error(function(){
        $scope.loadMoreAvailable = false;
      });
    }

    $scope.postMessage = function(text){
      $scope.newMessage = null;
      $http.post(API_URL + 'forums/' + $stateParams.forumId + '/messages', {
        'message': text
      }).success(function(response){
        $scope.activeForumMessages.push({
          message: text,
          createdBy: {name:'You'},
          created: new Date()
        })
      })
    }
  });
