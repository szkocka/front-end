'use strict';

angular.module('researchApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/project/:id', {
        templateUrl: 'app/project/project.html',
        controller: 'ProjectCtrl'
      });
  });
