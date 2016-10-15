;(function() {
    'use strict';

    angular
        .module('profile.edit')
        .controller('ProfileEditController', ProfileEditController);

    /* ngInject */
    function ProfileEditController($scope, $state, $stateParams, profileService, Type,
        userProfileResolver, accountService, errorService) {

        /** @public {Boolean} */
        $scope.isMyProfile = $stateParams.id == accountService.getCurrentUser()._id;
        /** @public {Object} */
        $scope.user = userProfileResolver.data;

        $scope.save = save;

        /**
         * @param {Object} e
         */
        function save(valid, e) {
            e.preventDefault();
            if (!valid) {
                errorService.showError('Form is not valid');
                return;
            }
            if ($scope.isMyProfile) {
                profileService.saveMyProfileData($scope.user)
                    .then(function(res) {
                        $state.go('profile', {id: 'my'});
                    }, function(err) {
                        console.log(err.message);
                    });
            } else {
                profileService.saveUsersProfileData($scope.user)
                    .then(function(res) {
                        $state.go('profile', {id: $scope.user.id});
                    }, function(err) {
                        console.log(err.message);
                    });
            }
        };
    }
})();