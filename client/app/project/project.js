'use strict';

// angular.module('researchApp')
//   .config(function ($routeProvider) {
//     $routeProvider
//       .when('/project/:id', {
//         templateUrl: 'app/project/project.html',
//         controller: 'ProjectCtrl'
//       });
//   });


  angular.module('researchApp').config(function($stateProvider, $urlRouterProvider) {

    // $urlRouterProvider.otherwise("/dailysummary");

    $stateProvider
      .state('project', {
        url: "/project/:id",
        templateUrl: 'app/project/project.html',
        controller: 'ProjectCtrl'
      })
        .state('project.about', {
          url: "/about",
          templateUrl: "app/project/tabs/about.html",
          // controller: 'ProjectCtrl'
        })
        .state('project.participants', {
          url: "/participants",
          templateUrl: "app/project/tabs/participants.html",
          // controller: 'ProjectCtrl'
        })
        .state('project.forum', {
          url: "/forum",
          templateUrl: "app/project/tabs/forum.html",
          // controller: 'ProjectCtrl'
        })
  });
