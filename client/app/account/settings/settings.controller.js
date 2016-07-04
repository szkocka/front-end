'use strict';
define(['angular'], function (angular) {

    angular.module('researchApp.Controllers').controller('SettingsCtrl', 
        ['$scope', 'User', 'Auth',
        function ($scope, User, Auth) {
            /** @private {Object} */
            $scope.errors = {};

            /**
             * @public
             * @param {Object} form
             */
            $scope.changePassword = function(form) {
                //Assert.isObject(form, 'Invalid "form" type');

                $scope.submitted = true;

                if(form.$valid) {
                    Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
                        .then( function() {
                            $scope.message = 'Password successfully changed.';
                        })
                        .catch( function() {
                            form.password.$setValidity('mongoose', false);
                            $scope.errors.other = 'Incorrect password';
                            $scope.message = '';
                        });
                }
            };
    }]);
});
