;(function() {
    'use strict';

    angular
        .module('sign-in')
        .controller('SignInController', SignInController);

    /* ngInject */
    function SignInController($scope, $state, signInService, Assert, Type) {
        /** @public {Object} */
        $scope.user = {};
        /** @public {String} */
        $scope.error = null;

        $scope.signIn = signIn;

        /**
         * @param {Object} event
         * @param {Boolean} valid
         */
        function signIn(valid, event) {
            Assert.isObject(event, 'Invalid "event" type');

            event.preventDefault();

            if (!valid) {
                $scope.error = 'Form is not valid';
                return;
            }

            signInService.signIn($scope.user)
                .then(function(){
                    $state.go('home');
                }, function(err){
                    $scope.error = err.message;
                    console.log(err.message);
                });
        };
    }
})();