'use strict';

angular.module('researchApp').config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/admin', '/admin/users');
  $stateProvider
    .state('admin', {
      url: "/admin",
      templateUrl: 'app/admin/admin.html',
      controller: 'AdminCtrl',
      abstract: true
    })

	.state('admin.users', {
		url: "/users",
		templateUrl: "app/admin/tabs/users.html",
	})
    .state('admin.posts', {
        url: "/posts/:userId",
        templateUrl: "app/admin/tabs/posts.html",
    })
    .state('admin.researches', {
        url: "/researches",
        templateUrl: "app/admin/tabs/researches.html",
        controller: 'ResearchesCtrl',
    })
});

