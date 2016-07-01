'use strict';

define(['angular',
  'modules/news/news.controller'
  ], function (angular) {

  return angular.module('researchApp.Routers')
    .config(function ($stateProvider) {
      $stateProvider
	    .state('news', {
	      url: "/news",
	      templateUrl: 'app/modules/news/news.html',
	      controller: 'NewsCtrl'
	    })
    });
});