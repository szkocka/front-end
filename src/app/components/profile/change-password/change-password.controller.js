;(function() {
    'use strict';

    angular
        .module('change-password')
        .controller('ChangePasswordController', ChangePasswordController);

    /* ngInject */
    function ChangePasswordController($scope, profileService) {
        /** @private {Object} */
        $scope.data = {};
        /** @private {String} */
        $scope.errorMsg = null;
        /** @private {String} */
        $scope.message = null;

        $scope.changePassword = changePassword;

        /**
         * @param {Boolean} valid
         * @param {Object} e
         */
        function changePassword(valid, e) {
            e.preventDefault();

            if(!valid) {
                return;
            }
            profileService.changePassword($scope.data)
                .then(function(res) {
                    $scope.message = 'Password successfully changed.';
                    $scope.data = {};
                }, function(err) {
                    $scope.message = null;
                    $scope.errorMsg = 'Incorrect password';
                });
        };
    }
})();