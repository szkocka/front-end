;(function() {
    'use strict';

    angular
        .module('footer')
        .directive('footerSection', footerSection);

    function footerSection() {
        return {
            restrict: 'EA',
            templateUrl: 'shared/footer/footer.html',
            controller: 'FooterController'
        }
    }
})();