'use strict';

var API_URL = "https://szkocka-1080.appspot.com/";
define(['angular',
  'uiRouter',
  'ngResource',
  'ngCookies',
  'ngSanitize',
  'ngMoment',
  'ngFileUpload',
  'ngTagsInput',
  'ngFileUploadShim',
  'uiBootstrapTpls',
  'moment',
  'lodash', 
  'kendo',
  'lazyScroll',

  //========== HOME ===========//
  //'bootstrap',
  ], function (angular) {

  var app = angular.module('researchApp', [
    'researchApp.Services',
    'researchApp.Controllers',
    'researchApp.Directives',
    'researchApp.Utils',

    'ui.router',
    'ngResource',
    //'kendo.directives',
    'ngCookies',
    'ngSanitize',
    'angularMoment',
    'ngFileUpload',
    'ngTagsInput',
    'ui.bootstrap',
    'lazy-scroll'
  ]);

  app.config(function ($urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
  });

  return app;
});