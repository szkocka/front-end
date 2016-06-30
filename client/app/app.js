'use strict';

var API_URL = "https://szkocka-1080.appspot.com/";

angular.module('researchApp', [
  'researchApp.Services',
  'researchApp.Controllers',
  'researchApp.Directives',
  'researchApp.Utils',
  'researchApp.Libs',
  'ngCookies',
  'ngResource',
  'ui.router',
  'ngSanitize',
  'ui.bootstrap',
  'angularMoment',
  'ngFileUpload',
  'ngTagsInput',
  'kendo.directives',
  'lazy-scroll'
])
  .config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    //$locationProvider.html5Mode(true);
  })
