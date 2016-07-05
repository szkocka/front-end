'use strict';

define(['angular'], function (angular) {
    angular.module('researchApp.Controllers').controller('ProfileCtrl',
        ['$scope', '$state', '$stateParams', 'ProfileService', 'currentUser', 'Assert', 'Type',
        function ($scope, $state, $stateParams, ProfileService, currentUser, Assert, Type) {
            /** @private {String} */
            $scope.userId = $stateParams.id;
            /** @private {Object} */
            $scope.currentUser = currentUser;
            /** @public {Object} */
            $scope.isMyProfile = $scope.currentUser._id == $scope.userId;
            /** @public {Object} */
            $scope.user = {};
            /** @public {Array<String>} */
            $scope.area = [];
            /** @public {Array<Object>} */
            $scope.invitations = [];
            /** @public {String} */
            $scope.errorMsg = '';

            /**
             * @private
             */
            $scope._init = function() {
                $scope.getUserProfile();

                if ($scope.isMyProfile) {
                    $scope.getInvitations();
                }
            };

            /**
             * @public
             */
            $scope.getInvitations = function() {
                ProfileService.getInvitations(function(err, res) {
                    if (!Type.isNull(res)) {
                        $scope.invitations = _.uniq(res.data.researches);
                    }
                });
            };

            /**
             * @public
             */
            $scope.getUserProfile = function() {
                ProfileService.getUserProfile($scope.userId, function(err, res) {
                    if (Type.isNull(res)) {
                        $scope.errorMsg = 'User was not found';
                    } else {
                        $scope.user = res.data;
                        if (!_.isEmpty($scope.user.supervisor_of)){
                            var area = []; 
                            $scope.user.supervisor_of.forEach(function(proj) {
                                area.push(proj.area);
                            });
                            $scope.area = _.uniq(area)
                        }
                    }
                });
            };

            /**
             * @public
             */
            $scope.edit = function() {
                $state.go('edit-profile', {id: $scope.userId});
            };

            /**
             * @public
             * @param {Object} proj
             */
            $scope.accept = function(proj) {
                Assert.isObject(proj, 'Invalid "proj" type');

                ProfileService.acceptInvitation(proj.id.toString(), function(err, res) {
                    if (!Type.isNull(res)) {
                        $scope._init();
                    }
                });
            };

            /**
             * @public
             * @param {Object} proj
             */
            $scope.ignore = function(proj) {
                Assert.isObject(proj, 'Invalid "proj" type');

                ProfileService.declineInvitation(proj.id.toString(), function(err, res) {
                    if (!Type.isNull(res)) {
                        $scope._init();
                    }
                });
            };

            $scope._init();
        }]);
});