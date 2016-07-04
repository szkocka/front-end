'use strict';

define(['angular'], function (angular) {

    angular.module('researchApp.Controllers').controller('SignupCtrl', 
        ['$scope', 'Auth', '$location', '$window',
        function ($scope, Auth, $location, $window) {
            /** @private {Object} */
            $scope.user = {};
            /** @private {Object} */
            $scope.errors = {};

            /**
             * @public
             * @param {Object} form
             */
            $scope.register = function(form) {
                //Assert.isObject(form, 'Invalid "form" type');
                $scope.submitted = true;

                if(form.$valid) {
                    Auth.createUser({
                        name: $scope.user.name,
                        email: $scope.user.email,
                        password: $scope.user.password,
                        cv: $scope.user.cv
                    })
                    .then( function() {
                        // Account created, redirect to home
                        $location.path('/');
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
                $window.location.href = '/auth/' + provider;
            };
    }]);
});