'use strict';

define(['angular',
  //========== HOME ===========//
  'modules/home/home.controller'
  ], function (angular) {

  return angular.module('researchApp')

  .config(function ($stateProvider) {
    $stateProvider
      .state('homepage', {
        url: "/",
        templateUrl: 'app/modules/home/home.html',
        controller: 'HomeCtrl'
      })
  });
});