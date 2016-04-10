'use strict';

angular.module('researchApp')
  .controller('AboutCtrl', function ($scope, $http, Auth) {
  	$scope.aboutProject = {
  		currentDescription: '',
  		newDescription: ''
  	};
  	$scope.errorMsg = '';
  	$scope.successMsg = '';
  	$scope.showEditButton = (Auth.getCurrentUser().role === 'admin');
  	$scope.showEditableTexarea = false;

  	$http.get(API_URL + 'about').success(function(about) {
      	$scope.aboutProject.currentDescription = about;
      	$scope.aboutProject.newDescription = about;
    }).error(function(error){});

    $scope.updateAbout = function() {
    	$http.put(API_URL + 'about', {about: $scope.aboutProject.description})
    		.success(function(about){
          		$scope.aboutProject.currentDescription = about;
          		$scope.showEditableTexarea = false;
          		$scope.successMsg = 'Information was saved successfully';
        }).error(function(error){
        		$scope.errorMsg = 'Error: Information was not updated';
          		$scope.showEditableTexarea = false;
        });
    };

    $scope.edit = function() {
    	$scope.errorMsg = '';
    	$scope.successMsg = '';
    	$scope.showEditableTexarea = true;
    };

    $scope.cancel = function() {
    	$scope.showEditableTexarea = false;
    };
  });
