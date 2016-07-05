'use strict';

define(['angular'], function (angular) {
    angular.module('researchApp.Controllers').controller('MyProjectsCtrl',
        ['$scope', 'ProfileService', 'Type', 'userId',
        function ($scope, ProfileService, Type, userId) {

            /** @private {String} */
            $scope.userId = userId;
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

            $scope._init();
    }]);
});
