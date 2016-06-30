'use strict';

var API_URL = "https://szkocka-1080.appspot.com/";
define(['angular',

  ], function (angular) {

return angular.module('researchApp', [
    'researchApp.Services',
    'researchApp.Controllers',
    'researchApp.Directives',
    'researchApp.Utils',
    'researchApp.Libs',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.bootstrap',
    'ngMoment',
    'ngFileUpload',
    'ngTagsInput',
    'kendo.directives',
    'lazyScroll'
  ])

  .config(function ($urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
  });
});