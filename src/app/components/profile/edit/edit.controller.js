;(function() {
    'use strict';

    angular
        .module('profile.edit')
        .controller('ProfileEditController', ProfileEditController);

    /* ngInject */
    function ProfileEditController($scope, $state, profileService, Type, userProfileResolver) {
        /** @public {Object} */
        $scope.user = userProfileResolver.data;

        $scope.save = save;

        /**
         * @param {Object} e
         */
        function save(e) {
            e.preventDefault();

            profileService.saveUsersProfileData($scope.user)
                .then(function(res) {
                    $state.go('profile', {id: $scope.user.id});
                }, function(err) {
                    console.log(err.message);
                });
        };
    }
})();