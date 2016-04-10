'use strict';

angular.module('researchApp')
  .controller('MyProjectsCtrl', function ($scope, $http, Auth) {

    $scope.myProjectsList = [];
    $scope.name = Auth.getCurrentUser().name;

    $http.get(API_URL + 'researches').success(function(projectsList) {
      var allProjects = _(projectsList.researches).value();
      var data = _.chain(allProjects)
        .map(function(d){
          if (d.supervisor.name === $scope.name) {
            $scope.myProjectsList.push(d)
          }
        })
        .flatten()
        .uniq()
        .compact()
        .value()
    });

  });
