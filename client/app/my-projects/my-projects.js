'use strict';

angular.module('researchApp').config(function($stateProvider) {
  $stateProvider
    .state('my-projects', {
      url: "/my-projects",
      templateUrl: 'app/my-projects/my-projects.html',
      controller: 'MyProjectsCtrl'
    })
});
