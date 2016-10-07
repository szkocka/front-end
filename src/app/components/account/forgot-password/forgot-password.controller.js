;(function() {
    'use strict';

    angular
        .module('forgot-password')
        .controller('ForgotPasswordController', ForgotPasswordController);

    /* ngInject */
    function ForgotPasswordController($scope, $state, forgotPasswordService, Assert, Type, errorService) {
        /** @public {Object} */
        $scope.password = {};

        $scope.setPassword = setPassword;

        /**
         * @param {Object} event
         * @param {Boolean} valid
         */
        function setPassword(valid, event) {
            Assert.isObject(event, 'Invalid "event" type');

            event.preventDefault();

            if (!valid) {
                errorService.showError('Form is not valid');
                return;
            }

            forgotPasswordService.setPassword($scope.password)
                .then(function(){
                    $state.go('sing-in');
                }, function(err){
                    errorService.showError(err.data.message);
                });
        };
    }
})();