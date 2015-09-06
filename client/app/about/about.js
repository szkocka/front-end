'use strict';

angular.module('researchApp').config(function($stateProvider) {
  $stateProvider
    .state('about', {
      url: "/about",
      templateUrl: 'app/about/about.html',
      controller: 'AboutCtrl'
    })
});
