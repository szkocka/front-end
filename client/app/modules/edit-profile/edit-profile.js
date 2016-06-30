'use strict';

angular.module('researchApp').config(function($stateProvider) {
  $stateProvider
    .state('edit-profile', {
      url: "/edit-profile/:id",
      templateUrl: 'app/modules/edit-profile/edit-profile.html',
      controller: 'EditProfileCtrl'
    })
});
