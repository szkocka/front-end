'use strict';

angular.module('researchApp').config(function($stateProvider) {
  $stateProvider
    .state('my_projects', {
      url: "/my_projects",
      templateUrl: 'app/my_projects/my_projects.html',
      controller: 'MyProjectsCtrl'
    })
});
