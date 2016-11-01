;(function() {
    'use strict';

    angular
        .module('sign-up')
        .controller('SignUpController', SignUpController);

    /* ngInject */
    function SignUpController($scope, $state, signUpService, Type, Assert, errorService, linkify) {
        /** @public {Object} */
        $scope.user = {};

        $scope.signUp = signUp;

        /**
         * @param {Object} event
         * @param {Boolean} valid
         */
        function signUp(valid, event) {
            Assert.isObject(event, 'Invalid "event" type');

            event.preventDefault();

            if (!valid) {
                errorService.showError('Form is not valid');
                return;
            }
            if (Type.isString ($scope.user.cv)) {
                $scope.user.cv = linkify.linkifyString($scope.user.cv);
            }
            signUpService.signUp($scope.user)
                .then(function(){
                        $state.go('home');
                    }, function(err){
                        console.log(err.data.message);
                    });
            }
    }
})();