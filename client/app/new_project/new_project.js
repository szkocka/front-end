'use strict';

angular.module('researchApp').config(function($stateProvider) {
  $stateProvider
    .state('new_project', {
      url: "/new_project",
      templateUrl: 'app/new_project/new_project.html',
      controller: 'NewProjectCtrl'
    })
});
