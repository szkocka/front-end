'use strict';

angular.module('researchApp')
  .controller('AboutCtrl', function ($scope, $http, Auth) {
  	$scope.aboutProject = {
  		currentDescription: '',
  		newDescription: ''
  	};
  	$scope.errorMsg = '';
  	$scope.successMsg = '';
  	$scope.showEditButton = false;
  	$scope.showEditableTexarea = false;
    _init();

    function _init() {
      $http.get(API_URL + 'pages/about').success(function(about) {
        $scope.showEditButton = Auth.isAdmin();
        $scope.aboutProject.currentDescription = about.content;
        $scope.aboutProject.newDescription = about.content;
      }).error(function(error){
        $scope.errorMsg = 'Error: Page was not loaded';
      });
    }

    $scope.updateAbout = function() {
    	$http.post(API_URL + 'pages/about', {content: $scope.aboutProject.newDescription})
    		.success(function(about){
      		$scope.aboutProject.currentDescription = $scope.aboutProject.newDescription;
      		$scope.showEditableTexarea = false;
      		$scope.successMsg = 'Saved';
        }).error(function(error){
      		$scope.errorMsg = 'Error';
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
