'use strict';

define(['angular',
    'modules/my-projects/my-projects.controller'
    ], function (angular) {

    return angular.module('researchApp.Routers').config(function ($stateProvider) {
        $stateProvider
            .state('my-projects', {
                url: "/my-projects",
                templateUrl: 'app/modules/my-projects/my-projects.html',
                controller: 'MyProjectsCtrl',
                resolve: {
                    userId: function(Auth) {
                        return Auth.getCurrentUser()._id.toString();
                    }
                }
            })
    });
});