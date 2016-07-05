'use strict';

define(['angular',
    'modules/profile/profile.controller'
    ], function (angular) {

    return angular.module('researchApp.Routers').config(function ($stateProvider) {
        $stateProvider
            .state('profile', {
                url: "/profile/:id",
                templateUrl: "app/modules/profile/profile.html",
                controller: 'ProfileCtrl',
                resolve: {
                    currentUser: function(Auth) {
                        return Auth.getCurrentUser();
                    }
                }
            })
        });
});
