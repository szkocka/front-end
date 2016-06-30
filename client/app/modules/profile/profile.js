'use strict';

angular.module('researchApp').config(function($stateProvider) {
  $stateProvider
    .state('profile', {
      url: "/profile/:id",
      templateUrl: "app/modules/profile/profile.html",
      controller: 'ProfileCtrl'
    })
});
