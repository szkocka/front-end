'use strict';

angular.module('researchApp').config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('project', {
      url: "/project/:id",
      templateUrl: 'app/project/project.html',
      controller: 'ProjectCtrl',
    })
      .state('project.about', {
        url: "/about",
        templateUrl: "app/project/tabs/about.html",
      })
      .state('project.participants', {
        url: "/participants",
        templateUrl: "app/project/tabs/participants.html",
      })
      .state('project.forum', {
        url: "/forum",
        templateUrl: "app/project/tabs/forum.html",
        controller: 'ProjectForumCtrl'
      })
});
