;(function() {
    'use strict';

    angular
        .module('navigation-bar')
        .controller('NavigationBarController', NavigationBarController);

    /* ngInject */
    function NavigationBarController($scope, $rootScope, accountService) {
        $scope.signOut = $rootScope.signOut;
        $scope.isAdmin = accountService.isAdmin();
    }
})();