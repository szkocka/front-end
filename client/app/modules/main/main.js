'use strict';

angular.module('researchApp').config(function($stateProvider) {
  $stateProvider
    .state('homepage', {
      url: "/",
      templateUrl: 'app/modules/main/main.html',
      controller: 'MainCtrl',
      resolve: {
        user: function(Auth) {
          return Auth.getCurrentUser();
        }
      }
    })
});
