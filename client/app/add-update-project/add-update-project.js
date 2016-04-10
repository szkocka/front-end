'use strict';

angular.module('researchApp').config(function($stateProvider) {
  $stateProvider
    .state('add-update-project', {
      url: "/add-update-project/:id",
      templateUrl: 'app/add-update-project/add-update-project.html',
      controller: 'AddUpdateProjectCtrl'
    })
});
