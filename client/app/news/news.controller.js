'use strict';

angular.module('researchApp')
  .controller('NewsCtrl', function ($scope, $http, $stateParams, Auth, Upload) {
  	$scope.showAddButton = false;
  	$scope.showMore = true;
  	$scope.addNewsSection = false;
    $scope.news = {};
    $scope.newsToAdd = {};
    _init();

    function _init() {
    	$scope.errorMsg = '';

    	$http.get(API_URL + 'news').success(function(res){
	    	$scope.showAddButton = Auth.isAdmin();
	      	$scope.news = res.news;
	      	$scope.news.forEach(function(el) {
	      		el.showMore = true;
	      	});
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
  });
