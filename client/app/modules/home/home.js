'use strict';

define(['angular',
    'modules/home/home.controller'
    ], function (angular) {

    return angular.module('researchApp.Routers').config(function ($stateProvider) {
        $stateProvider
            .state('homepage', {
                url: "/",
                templateUrl: 'app/modules/home/home.html',
                controller: 'HomeCtrl'
            })
    });
});
