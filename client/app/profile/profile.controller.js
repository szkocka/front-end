'use strict';

angular.module('researchApp')
  .controller('ProfileCtrl', function ($scope, $stateParams, $http) {
    $scope.userId = $stateParams.id;
    $scope.user = {};
    $scope.area = [];

    $http.get(API_URL + '/users/' + $scope.userId).success(function(res) {
      $scope.user = res;
      if (!_.isEmpty($scope.user.supervisor_of)){
        var area = []; 
        $scope.user.supervisor_of.forEach(function(proj) {
          area.push(proj.area);
        });
        $scope.area = _.uniq(area)
      }
    });
});