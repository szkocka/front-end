'use strict';
define(['angular'], function (angular) {

    angular.module('researchApp.Controllers')
        .controller('NavbarCtrl', ['$scope', '$location', 'Auth',
        function ($scope, $location, Auth) {
          $scope.menu = [{
            'title': 'Home',
            'link': '/'
          }];

          $scope.isCollapsed = true;
          $scope.isLoggedIn = Auth.isLoggedIn;
          $scope.isAdmin = Auth.isAdmin;
          $scope.getCurrentUser = Auth.getCurrentUser;

          $scope.logout = function() {
            Auth.logout();
            $location.path('/login');
          };

          $scope.isActive = function(route) {
            return route === $location.path();
          };
    }]);
});
