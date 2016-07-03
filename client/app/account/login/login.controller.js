'use strict';

define(['angular'], function (angular) {
    angular.module('researchApp.Controllers').controller('LoginCtrl',
    ['$scope', 'Auth', '$location', '$window', 'Assert', 'Type',
        function ($scope, Auth, $location, $window, Assert, Type) {
            /** @private {Object} */
            $scope.user = {};
            /** @private {Object} */
            $scope.errors = {};

            /**
             * @public
             * @param {Object} form
             */
            $scope.login = function(form) {
                Assert.isObject(form, 'Invalid "form" type');
                $scope.submitted = true;

                if(form.$valid) {
                    Auth.login({
                        email: $scope.user.email,
                        password: $scope.user.password
                    })
                    .then( function() {
                        // Logged in, redirect to home
                        $location.path('#/');
                    })
                    .catch( function(err) {
                        $scope.errors.other = err.message;
                    });
                }
            };

            /**
             * @public
             * @param {String} provider
             */
            $scope.loginOauth = function(provider) {
                Assert.isString(provider, 'Invalid "provider" type');
                $window.location.href = '#/auth/' + provider;
            };
    }]);
});
