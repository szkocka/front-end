;(function() {
    'use strict';

    angular
        .module('profile')
        .controller('ProfileController', ProfileController);

    /* ngInject */
    function ProfileController($scope, $state, $stateParams, profileService,
        accountService, Assert, Type) {
        /** @public {Boolean} */
        $scope.isMyProfile = $stateParams.id === 'my' || $stateParams.id == accountService.getCurrentUser()._id;
        /** @private {String} */
        $scope.userId = $scope.isMyProfile ? accountService.getCurrentUser()._id : $stateParams.id;
        /** @public {Object} */
        $scope.user = {};
        /** @public {Array<Object>} */
        $scope.invitations = [];
        /** @public {String} */
        $scope.currentNavItem = 'supervising';
        /** @public {String} */
        $scope.showMyProjects = true;

        $scope._init = _init;
        $scope.getUserProfile = getUserProfile;
        $scope.getInvitations = getInvitations;
        $scope.edit = edit;
        $scope.accept = accept;
        $scope.ignore = ignore;

        $scope.showSupervising = showSupervising;
        $scope.showResearcherIn = showResearcherIn;

        function _init() {
            $scope.getUserProfile();

            if ($scope.isMyProfile) {
                $scope.getInvitations();
            }
        };

        function getUserProfile() {
            profileService.getUserProfile($scope.userId)
                .then(function(res) {
                        $scope.user = res.data;
                    }, function(err) {
                    });
        };

        function getInvitations() {
            profileService.getInvitations()
                .then(function(res) {
                    $scope.invitations = _.uniq(res.data.researches);
                }, function(err) {
                    console.log(err.message);
                });
        };

        function edit() {
            $state.go('profile-edit', {id: $scope.userId});
        };

        /**
         * @param {Object} proj
         */
        function accept(proj) {
            Assert.isObject(proj, 'Invalid "proj" type');

            profileService.acceptInvitation(proj.id)
                .then(function(res) {
                    $scope._init();
                }, function(err) {
                    console.log(err.message);
                });
        };

        /**
         * @param {Object} proj
         */
        function ignore(proj) {
            Assert.isObject(proj, 'Invalid "proj" type');

            profileService.declineInvitation(proj.id)
                .then(function(res) {
                    $scope._init();
                }, function(err) {
                    console.log(err.message);
                });
        };

        function showSupervising() {
            $scope.showMyProjects = true;
        };

        function showResearcherIn() {
            $scope.showMyProjects = false;
        };

        $scope._init();
    }
})();