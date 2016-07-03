'use strict';
define(['angular'], function (angular) {

    angular.module('researchApp.Controllers').controller('NavbarCtrl', 
        ['$scope', '$location', 'Auth', 'Assert',
        function ($scope, $location, Auth, Assert) {
            /** @public {Array} */
            $scope.menu = [{
                'title': 'Home',
                'link': '/'
            }];

            /** @public {Boolean} */
            $scope.isCollapsed = true;
            /** @public {Function} */
            $scope.isLoggedIn = Auth.isLoggedIn;
            /** @public {Function} */
            $scope.isAdmin = Auth.isAdmin;
            /** @public {Function} */
            $scope.getCurrentUser = Auth.getCurrentUser;

            /**
             * @public
             */
            $scope.logout = function() {
                Auth.logout();
                $location.path('/login');
            };

            /**
             * @public
             * @param {String} route
             * @return {Boolean}
             */
            $scope.isActive = function(route) {
                Assert.isString(route, 'Invalid "route" type');
                return route === $location.path();
            };
    }]);
});
