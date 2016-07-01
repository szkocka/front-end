'use strict';
define(['angular'], function (angular) {
    angular.module('researchApp.Controllers')
        .controller('NewsCtrl', ['$scope', '$http', '$stateParams', 'Auth', 'Upload',
        function ($scope, $http, $stateParams, Auth, Upload) {
          $scope.showAddButton = false;
          $scope.showMore = true;
          $scope.addNewsSection = false;
          $scope.news = [];
          $scope.newsToAdd = {};
          $scope.cursor = '';
          $scope.loadMoreAvailable = true;
          $scope.limit = 20;
          _init();

          $scope.loadMore = function() {
            if($scope.loadMoreAvailable) {
              _init();
            }
          };

          function _init() {
            $scope.errorMsg = '';
            var query;
            if ($scope.cursor == '') {
              query = 'news';
            } else {
              query = 'news?cursor=' + $scope.cursor;
            }

            $http.get(API_URL + query).success(function(res){
              if ($scope.cursor == res.cursor) {
                return;
              }
              if (res.news.length < $scope.limit) {
                $scope.loadMoreAvailable = false;
              }
              $scope.cursor = res.cursor;
              $scope.showAddButton = Auth.isAdmin();

              res.news.forEach(function(el) {
                el.showMore = true;
                $scope.news.push(el);
              });
            }).error(function(){
              $scope.loadMoreAvailable = false;
            });
          }

          $scope.showMore = function(el) {
            el.showMore = false;
          };
          $scope.showLess = function(el) {
            el.showMore = true;
          };

          $scope.addNews = function() {
            $scope.showAddButton = false;
            $scope.addNewsSection = true;
          };

          $scope.save = function() {
            if (!$scope.newsToAdd.title || $scope.newsToAdd.title == '' ||
              !$scope.newsToAdd.body || $scope.newsToAdd.body == '') {
              $scope.errorMsg = 'Required field';
              return;
            }
            $http.post(API_URL + 'news', {
              title: $scope.newsToAdd.title,
              body: $scope.newsToAdd.body,
              image_url: $scope.newsToAdd.image

            }).success(function(res){
              $scope.showAddButton = true;
              $scope.addNewsSection = false;
              $scope.newsToAdd = {};
              $scope.news = [];
              $scope.cursor = '';
              $scope.loadMoreAvailable = true;
              _init();
            });
          };

          $scope.cancel = function() {
            $scope.showAddButton = true;
            $scope.addNewsSection = false;
            $scope.errorMsg = '';
          };

          $scope.onFileSelect = function(event) {
            var image = event.target.files[0];
            
            if (image.type !== 'image/png' && image.type !== 'image/jpeg') {
                alert('Only PNG and JPEG are accepted.');
                return;
            }

            $scope.upload = Upload.upload({
                url: API_URL + 'upload',
                method: 'POST',
                file: image
            }).success(function(data, status, headers, config) {
                $scope.newsToAdd.image = data.url;
            }).error(function(err) {
                console.log('Error uploading file: ' + err.message || err);
            });
          };

          $scope.detectClass = function(el) {
            if(el.showMore) {
              return 'short-decsr';
            } else {
              return 'long-decsr';
            }
          };
    }]);
});