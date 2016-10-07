;(function() {
    'use strict';

    angular
        .module('project-messages')
        .directive('mathjaxBind', mathjaxBind);

    /* ngInject */
    function mathjaxBind() {
        return {
            restrict: "A",
            controller: function($scope, $element, $attrs) {
                $scope.$watch($attrs.mathjaxBind, function(texExpression) {
                    $element.html(texExpression);
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub, $element[0]]);
                });
            }
        };
    }
})();
