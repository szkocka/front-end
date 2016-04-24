'use strict';

angular.module('researchApp').config(function($stateProvider) {
  $stateProvider
    .state('homepage', {
      url: "/",
      templateUrl: 'app/main/main.html',
      controller: 'MainCtrl'
    })
});


