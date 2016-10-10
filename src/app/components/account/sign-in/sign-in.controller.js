;(function() {
    'use strict';

    angular
        .module('sign-in')
        .controller('SignInController', SignInController);

    /* ngInject */
    function SignInController($scope, $state, signInService, Assert, Type, errorService) {
        /** @public {Object} */
        $scope.user = {};
        /** @public {Boolean} */
        $scope.showForgorPassword = false;

        $scope.signIn = signIn;
        $scope.showFP = showFP;
        $scope.hideFP = hideFP;
        $scope.forgotPassword = forgotPassword;

        /**
         * @param {Object} event
         * @param {Boolean} valid
         */
        function signIn(valid, event) {
            Assert.isObject(event, 'Invalid "event" type');

            event.preventDefault();

            if (!valid) {
                errorService.showError('Form is not valid');
                return;
            }

            signInService.signIn($scope.user)
                .then(function(){
                    $state.go('home');
                }, function(err){
                    errorService.showError(err.data.message);
                });
        };

        function showFP () {
            $scope.showForgorPassword = true;
        }

        function hideFP () {
            $scope.showForgorPassword = false;
        }

        /**
         * @param {String} email
         * @param {Boolean} valid
         * @param {Object} event
         */
        function forgotPassword(email, valid, event) {
            Assert.isBoolean(valid, 'Invalid "valid" type');
            Assert.isObject(event, 'Invalid "event" type');

            event.preventDefault();

            if (!valid) {
                errorService.showError('Form is not valid');
                return;
            }

            signInService.forgotPassword(email)
                .then(function(){
                    $scope.showForgorPassword = false;
                }, function(err){
                    errorService.showError(err.data.message);
                });
        };

    }
})();