;(function() {
    'use strict';

    angular
        .module('sign-in')
        .controller('SignInController', SignInController);

    /* ngInject */
    function SignInController($scope, $state, signInService, Assert, Type, errorService) {
        /** @public {Object} */
        $scope.user = {};

        $scope.signIn = signIn;

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
    }
})();