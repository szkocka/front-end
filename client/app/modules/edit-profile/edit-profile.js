'use strict';

define(['angular',
    'modules/edit-profile/edit-profile.controller'
    ], function (angular) {

    return angular.module('researchApp.Routers').config(function ($stateProvider) {
        $stateProvider
            .state('edit-profile', {
                url: "/edit-profile/:id",
                templateUrl: 'app/modules/edit-profile/edit-profile.html',
                controller: 'EditProfileCtrl'
            })
    });
});