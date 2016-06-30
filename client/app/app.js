'use strict';

var API_URL = "https://szkocka-1080.appspot.com/";
define(['angular',

  //========== SERVICES ===========//
  'services/auth.service',
  'services/authInterceptor',
  'services/news.service',
  'services/researches.service',
  'services/rest.service',
  'services/user.service',

  //========== ACCOUNT ===========//
  'account/account',
  'account/login/login.controller',
  'account/settings/settings.controller',
  'account/signup/signup.controller',

  //========== COMPONENTS ===========//
  'commonComponents/modal/modal.service',
  'commonComponents/navbar/navbar.controller',

  //========== HOME ===========//
  'modules/home/home',
  ], function (angular) {

  return angular.module('researchApp', [
    'researchApp.Services',
    'researchApp.Controllers',
    'researchApp.Directives',
    'researchApp.Utils',

    'ngResource',
    'uiRouter',
    'ngSanitize',
    'ngMoment',
    'ngFileUpload',
    'ngTagsInput',
    'ngFileUploadShim',
    'uiBootstrapTpls',
    'moment',
    'lodash', 
    'jquery',
    'kendo.directives',
    'lazyScroll'
  ])

  .config(function ($urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
  });
});