/*
 Make carousel consume all free space like background:cover does
 */
angular.module('researchApp')
    .directive('ngCarouselWrapper', ['$timeout', '$rootScope',    function ($timeout, $rootScope) {

    return {
        restrict: 'A',
        link: function ($scope, element, attrs) {
            $timeout(function() {
                function carousel_prepare(){

                    $('#carousel-wrapper .carousel').css({
                        'margin': 0,
                        'width': $(this).parent().outerWidth(),
                        'height': $(this).parent().outerHeight()
                    });

                    $('#carousel-wrapper .carousel .item').css({
                        'width': '100%',
                        'height': '100%'
                    });

                    $('#carousel-wrapper .carousel-inner div.item img').each(function() {
                        var imgSrc = $(this).attr('src');
                        $(this).parent().css({
                            'background': 'url('+imgSrc+') center center no-repeat',
                            '-webkit-background-size': 'cover',
                            '-moz-background-size': 'cover',
                            '-o-background-size': 'cover',
                            'background-size': 'cover',
                        });
                        $(this).remove();
                    });
                }
                carousel_prepare();

                $rootScope.$on('projectsFilter', function (event, data) {
                    $timeout(function() {
                        carousel_prepare();
                    });
                });
            });
        }
    };
}]);

