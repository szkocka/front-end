;(function() {
    'use strict';

    angular
        .module('navigation-bar')
        .controller('NavigationBarController', NavigationBarController);

    /* ngInject */
    function NavigationBarController($scope, $rootScope, accountService, $mdDialog, $mdSidenav, $location) {
        $scope.user = accountService.getCurrentUser();
        $scope.isAdmin = accountService.isAdmin();

        $scope.signOut = $rootScope.signOut;

        $scope.openMenu = openMenu;
        $scope.toggleLeft = buildToggler('left');
        $scope.isActive = isActive;

        function openMenu($mdOpenMenu, e) {
            $mdOpenMenu(e);
        }

        function buildToggler(componentId) {
                return function() {
                $mdSidenav(componentId).toggle();
            }
        }

        function isActive(route) {
            return route === $location.path();
        }
    }
})();