'use strict'

define(['angular'], function (angular) {

    angular.module('researchApp.Directives')
        .directive('mathjaxBind', function () {

        return {
		    restrict: "A",
		    controller: function($scope, $element, $attrs) {
		      $scope.$watch($attrs.mathjaxBind, function(texExpression) {
		        $element.html(texExpression);
		        MathJax.Hub.Queue(["Typeset", MathJax.Hub, $element[0]]);
		      });
		    }
		  };
    	});
});