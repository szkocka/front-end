;(function() {
    'use strict';

    angular
        .module('error-handler')
        .controller('ErrorController', ErrorController);

    /* ngInject */
    function ErrorController($scope, $mdToast) {

        $scope.close = function() {
            $mdToast.hide();
        };
    }
})();