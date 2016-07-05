'use strict';

define(['angular'], function (angular) {
    angular.module('researchApp.Controllers').controller('EditProfileCtrl',
        ['$scope', '$http', '$state', '$stateParams', 'Auth',
        function ($scope, $http, $state, $stateParams, Auth) {
            $scope.userId = $stateParams.id;
            $scope.user = {};
            _init();

            function _init() {
                $http.get(API_URL + 'users/' + $scope.userId).success(function(user) {
                    $scope.user = user;
                });
            }

            $scope.save = function() {
                $http.put(API_URL + 'users',
                    {
                        cv: $scope.user.cv,
                        name: $scope.user.name
                    }).success(function(data){
                        $state.go('profile', {id: $scope.userId});
                });
            }
        }]);
});
