'use strict';

angular.module('researchApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/new_project', {
        templateUrl: 'app/new_project/new_project.html',
        controller: 'NewProjectCtrl'
      });
  });
