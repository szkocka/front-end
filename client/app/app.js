'use strict';

var API_URL = "https://szkocka-1080.appspot.com/";
define(['angular',
  'uiRouter',
  //========== HOME ===========//
  'bootstrap',
  ], function (angular) {

  var app = angular.module('researchApp', [
    'ui.router',
    'researchApp.Services',
    'researchApp.Controllers',
    'researchApp.Directives',
    'researchApp.Utils'
  ]);

  app.config(function ($urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
  });

  return app;
});