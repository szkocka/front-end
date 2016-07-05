'use strict';

define(['angular'], function (angular) {
    angular.module('researchApp.Controllers').controller('EditProfileCtrl',
        ['$scope', '$state', '$stateParams', 'ProfileService', 'Type',
        function ($scope, $state, $stateParams, ProfileService, Type) {
            /** @private {String} */
            $scope.userId = $stateParams.id;
            /** @public {Object} */
            $scope.user = {};

            /**
             * @private
             */
            $scope._init = function() {
                ProfileService.getUserProfile($scope.userId, function(err, res) {
                    if (!Type.isNull(res)) {
                        $scope.user = res.data;
                    }
                });
            };

            /**
             * @public
             */
            $scope.save = function() {
                var params = {
                    cv: $scope.user.cv,
                    name: $scope.user.name
                };
                ProfileService.saveUsersProfileData(params, function(err, res) {
                    if (!Type.isNull(res)) {
                        $state.go('profile', {id: $scope.userId});
                    }
                });
            };

            $scope._init();
        }]);
});
