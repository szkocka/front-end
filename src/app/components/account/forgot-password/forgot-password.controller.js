;(function() {
    'use strict';

    angular
        .module('forgot-password')
        .controller('ForgotPasswordController', ForgotPasswordController);

    /* ngInject */
    function ForgotPasswordController($scope, $state, $stateParams, forgotPasswordService, Assert, Type, errorService) {
        /** @public {Object} */
        $scope.token = $stateParams.token;
        /** @public {Object} */
        $scope.password = {};

        $scope.setPassword = setPassword;

        /**
         * @param {Object} event
         * @param {Boolean} valid
         */
        function setPassword(valid, event) {
            Assert.isBoolean(valid, 'Invalid "valid" type');
            Assert.isObject(event, 'Invalid "event" type');

            event.preventDefault();

            if (!valid) {
                errorService.showError('Form is not valid');
                return;
            }
            if ($scope.password.new !== $scope.password.confirm) {
                errorService.showError('Password and confirmation must match');
                return;
            }

            var params = {
                newPassword: $scope.password.new,
                token: $scope.token
            }

            forgotPasswordService.setPassword(params)
                .then(function(){
                    $state.go('sign-in');
                }, function(err){
                    //errorService.showError(err.data.message);
                });
        };
    }
})();