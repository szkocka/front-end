'use strict';

define(['angular',
  'modules/admin/admin.controller',
  'modules/admin/posts.controller',
  'modules/admin/researches.controller',
  ], function (angular) {

  return angular.module('researchApp.Routers')
    .config(function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.when('/admin', '/admin/users');
      $stateProvider
        .state('admin', {
          url: "/admin",
          templateUrl: 'app/modules/admin/admin.html',
          controller: 'AdminCtrl',
          abstract: true
        })
        .state('admin.users', {
          url: "/users",
          templateUrl: "app/modules/admin/tabs/users.html",
        })
        .state('admin.posts', {
            url: "/posts/:userId/:userName",
            templateUrl: "app/modules/admin/tabs/posts.html",
            controller: 'PostsCtrl',
        })
        .state('admin.researches', {
            url: "/researches",
            templateUrl: "app/modules/admin/tabs/researches.html",
            controller: 'ResearchesCtrl',
        })
    });
});
