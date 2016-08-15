;(function() {
    'use strict';

    angular
        .module('free-area')
        .controller('FreeAreaController', FreeAreaController);

    /* ngInject */
    function FreeAreaController($scope, authService) {
        $scope.isAuth = authService.isAuth();
    }
})();