'use strict';

var API_URL = "https://szkocka-1080.appspot.com/";
define(['angular',
  //'jquery',
  //'kendo',
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
  'lazyScroll',

  //========== HOME ===========//
  'common/bootstrap/bootstrap',
  ], function (angular) {

  var app = angular.module('researchApp', [
    'researchApp.Routers',
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

  app.config(function ($urlRouterProvider, $stateProvider, $httpProvider) {
      $urlRouterProvider.otherwise('/');
      $httpProvider.interceptors.push('authInterceptor');
  });

  app.factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};

        if (config.url && config.url.indexOf('http') !== -1 && $cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  });
  return app;
});