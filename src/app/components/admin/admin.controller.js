;(function() {
    'use strict';

    angular
        .module('admin')
        .controller('AdminController', AdminController);

    /* ngInject */
    function AdminController($scope) {
        /** @public {String} */
        $scope.currentNavItem = 'users';
    }
})();