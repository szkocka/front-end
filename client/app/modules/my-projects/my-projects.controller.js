'use strict';

define(['angular'], function (angular) {
    angular.module('researchApp.Controllers')
        .controller('MyProjectsCtrl', ['$scope', '$http', '$stateParams', 'Auth',
        function ($scope, $http, $stateParams, Auth) {
        	$scope.user = {};
		    $scope.userId = $stateParams.id;
		    $http.get(API_URL + 'users/' + $scope.userId).success(function(res){
		      $scope.user = res;
		    });
    }]);
});
