'use strict';

define(['angular',
    'modules/add-update-project/add-update-project.controller'
    ], function (angular) {

    return angular.module('researchApp.Routers').config(function ($stateProvider) {
        $stateProvider
            .state('add-update-project', {
                url: "/add-update-project/:id",
                templateUrl: 'app/modules/add-update-project/add-update-project.html',
                controller: 'AddUpdateProjectCtrl'
            })
    });
});