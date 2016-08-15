;(function() {
    'use strict';

    angular
        .module('navigation-bar')
        .directive('navigationBar', navigationBar);

    function navigationBar() {
        return {
            restrict: 'EA',
            scope: {
                showAuth: '@'
            },
            templateUrl: 'shared/navigation-bar/navigation-bar.html',
            controller: 'NavigationBarController'
        }
    }
})();