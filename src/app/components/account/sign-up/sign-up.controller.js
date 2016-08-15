;(function() {
    'use strict';

    angular
        .module('sign-up')
        .controller('SignUpController', SignUpController);

    /* ngInject */
    function SignUpController($scope, $state, signUpService, Type, Assert) {
        /** @public {Object} */
        $scope.user = {};
        /** @public {Object} */
        $scope.errors = {};

        $scope.signUp = signUp;

        /**
         * @param {Object} event
         * @param {Boolean} valid
         */
        function signUp(valid, event) {
            Assert.isObject(event, 'Invalid "event" type');

            event.preventDefault();

            if (!valid) {
                $scope.errors.valid = 'Form is not valid';
                return;
            }
            signUpService.signUp($scope.user)
                .then(function(){
                        $state.go('home');
                    }, function(err){
                        $scope.errors.other = err.message;
                        console.log(err.message);
                    });
            }
    }
})();