'use strict';

angular.module('researchApp')
  .controller('ProfileCtrl', function ($scope, $stateParams, $http) {
    $scope.name = $stateParams.id;
    var allProjects;
    var email;
    var supervising;
    var data;
    var area = [];
    var researcher = [];

    $http.get(API_URL + 'researches').success(function(projectsList) {
      allProjects = _(projectsList.researches).value();
      data = _.chain(allProjects)
        .map(function(d){
          if (_.contains(d.researchers, $scope.name)){
            researcher.push(d.title)
          }
          if (_.contains(d.supervisor.name, $scope.name)){
            if (d.supervisor.email){
              email = d.supervisor.email;     
            };
            area.push(d.area)
            return {title: d.title, id: d._id}
            }
        })
        .flatten()
        .uniq()
        .compact()
        .value()

      if (!_.isEmpty(data)){
        $scope.area = _.uniq(area)
        $scope.supervising = data;
        $scope.email = email;
        }
      if (!_.isEmpty(researcher)){
        $scope.researcher = _.uniq(researcher)
      }
  });
});