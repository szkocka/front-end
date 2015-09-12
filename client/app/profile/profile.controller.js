'use strict';

angular.module('researchApp')
  .controller('ProfileCtrl', function ($scope, $stateParams, $http) {
    $scope.name = $stateParams.id;
    var supervising = [];
    var area = [];
    var researcher = [];

    $http.get(API_URL + 'researches').success(function(projectsList) {
      for (var i in projectsList.researches){
          var proj = projectsList.researches[i];

          if (proj.supervisor.name === $stateParams.id){
              supervising.push({title: proj.title, id: proj._id});
              $scope.email = proj.supervisor.email;
              $scope.supervising = supervising;

              if (area.indexOf(proj.area) >= 0){
                  continue;
              }
              else{
                  area.push(proj.area);
                  $scope.area = area;
              }
          };
          if (proj.researchers.indexOf($stateParams.id) >= 0){
              researcher.push(proj.title)
              $scope.researcher = researcher;
          }
      };
  });
});