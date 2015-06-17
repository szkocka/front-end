'use strict';

angular.module('researchApp')
  .controller('MainCtrl', function ($scope, projects) {

    // Carousel
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
      var newWidth = 1170 + slides.length;
      slides.push({
        image: 'http://placekitten.com/' + newWidth + '/500'
      });
    };
    for (var i=0; i<4; i++) {
      $scope.addSlide();
    }

    $scope.tags = projects.tags;
    $scope.projects = projects.projectsList;

  });
