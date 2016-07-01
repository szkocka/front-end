'use strict';

define(['angular',
    'account/login/login.controller',
    'account/settings/settings.controller',
    'account/signup/signup.controller'
    ], function (angular) {

    angular.module('researchApp.Routers', ['ui.router'])
    .config(function($stateProvider) {
      $stateProvider
        .state('login', {
          url: "/login",
          templateUrl: 'app/account/login/login.html',
          controller: 'LoginCtrl'
        })
        .state('signup', {
          url: "/signup",
          templateUrl: 'app/account/signup/signup.html',
          controller: 'SignupCtrl'
        })
        .state('settings', {
          url: "/settings",
          templateUrl: 'app/account/settings/settings.html',
          controller: 'SettingsCtrl'
          //authenticate: true
        })
    });
});
