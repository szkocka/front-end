'use strict';

define(['angular',
    'modules/project/project.controller',
    'modules/project/projectForum.controller',
    'modules/project/projectForumMessages',
    'modules/project/forums.service',
    'modules/project/messages.service'
    ], function (angular) {

    return angular.module('researchApp.Routers').config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('/project/:id', '/project/:id/about');

        $stateProvider
            .state('project', {
                url: "/project/:id",
                templateUrl: 'app/modules/project/project.html',
                controller: 'ProjectCtrl',
                resolve: {
                    user: function(Auth) {
                        return Auth.getCurrentUser();
                    }
                },
                abstract: true
            })
                // project tabs
                .state('project.about', {
                    url: "/about",
                    templateUrl: "app/modules/project/tabs/about.html",
                })
                .state('project.participants', {
                    url: "/participants",
                    templateUrl: "app/modules/project/tabs/participants.html",
                })
                .state('project.forum', {
                    url: "/forum",
                    template: "<ui-view/>",
                    controller: function($state){
                        if( $state.current.url != '/all' && !$state.params.forumId ){
                            $state.go('project.forum.all')
                        }
                    },
                })
                    // forum options
                    .state('project.forum.all', {
                        url: "/all",
                        templateUrl: "app/modules/project/tabs/forum.html",
                        controller: 'ProjectForumCtrl'
                    })
                    .state('project.forum.one', {
                        url: "/:forumId",
                        templateUrl: "app/modules/project/tabs/forumMessages.html",
                        controller: 'ProjectForumMessagesCtrl'
                    })
    });
});
