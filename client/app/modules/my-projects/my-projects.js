'use strict';

angular.module('researchApp').config(function($stateProvider) {
  $stateProvider
    .state('my-projects', {
      url: "/my-projects/:id",
      templateUrl: 'app/modules/my-projects/my-projects.html',
      controller: 'MyProjectsCtrl'
    })
});
