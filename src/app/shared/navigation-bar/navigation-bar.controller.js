;(function() {
    'use strict';

    angular
        .module('navigation-bar')
        .controller('NavigationBarController', NavigationBarController);

    /* ngInject */
    function NavigationBarController($scope, $rootScope, accountService, $mdDialog, $mdSidenav) {
        $scope.user = accountService.getCurrentUser();
        $scope.isAdmin = accountService.isAdmin();
        $scope.signOut = $rootScope.signOut;
        $scope.openMenu = openMenu;
        $scope.toggleLeft = buildToggler('left');

        function openMenu($mdOpenMenu, e) {
            $mdOpenMenu(e);
        }

        function buildToggler(componentId) {
                return function() {
                $mdSidenav(componentId).toggle();
            }
        }
    }
})();