'use strict';

angular.module('researchApp').config(function($stateProvider) {
  $stateProvider
    .state('edit-profile', {
      url: "/edit-profile/",
      templateUrl: 'app/edit-profile/edit-profile.html',
      controller: 'EditProfileCtrl'
    })
});
