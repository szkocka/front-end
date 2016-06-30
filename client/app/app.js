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

  var app = angular.module('researchApp', [
    'researchApp.Services',
    'researchApp.Controllers',
    'researchApp.Directives',
    'researchApp.Utils'
  ]);

  app.init = function () {
      angular.bootstrap(document, ['researchApp']);
  };

  app.config(function ($urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
  });

  app.run(function () {
      
  });

  return app;
});