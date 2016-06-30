'use strict';

angular.module('researchApp').config(function($stateProvider) {
  $stateProvider
    .state('news', {
      url: "/news",
      templateUrl: 'app/modules/news/news.html',
      controller: 'NewsCtrl'
    })
});
