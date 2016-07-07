'use strict';

define(['angular'], function (angular) {
    angular.module('researchApp.Controllers').controller('ProjectCtrl',
        ['$scope', '$stateParams', '$state', 'user', 'ResearchesService', 'Assert', 'Type',
        function ($scope, $stateParams, $state, user, ResearchesService, Assert, Type) {
            /** @private {String} */
            $scope.researchId = $stateParams.id;
            /** @public {Object} */
            $scope.user = user;
            /** @public {Boolean} */
            $scope.inviteSent = false;
            /** @public {Boolean} */
            $scope.isSupervisor = false;
            /** @public {Boolean} */
            $scope.canJoinProject = false;
            /** @public {Object} */
            $scope.project = {};
            /** @public {Object} */
            $scope.newResearcher = {};
            /** @public {Array<Object>} */
            $scope.joinRequests = [];
            /** @public {String} */
            $scope.errorMsg = null;
            /** @public {String} */
            $scope.validationMsg = null;

            /**
             * @private
             */
            $scope._init = function() {
                $scope.error = '';

                $scope._getResearchById();
            };

            /**
             * @private
             */
            $scope._getResearchById = function() {
                ResearchesService.getResearchById($scope.researchId, function(err, res){
                     if (Type.isNull(res)) {
                        $scope.errorMsg = 'Failed to load the project';
                    } else {
                        $scope.project = res.data;

                        if($scope.user && $scope.user._id == $scope.project.supervisor.id ){
                            $scope.isSupervisor = true;
                        }

                        if($scope.project.relationship_type === 'NONE') {
                            $scope.canJoinProject = true;
                        }

                        if($scope.isSupervisor) {
                            $scope._getJoinRequests();
                        }
                        
                    }
                });
            };

            /**
             * @private
             */
            $scope._getJoinRequests = function() {
                ResearchesService.getJoinRequests($scope.researchId, function(err, res){
                     if (Type.isNull(res)) {
                        $scope.errorMsg = 'Failed to load join requests';
                    } else {
                        $scope.joinRequests = res.data.users;
                        if (_.any($scope.joinRequests, function(request) {
                            return request.id == $scope.user._id;
                        })) {
                            $scope.canJoinProject = false;
                        }
                    }
                });
            };

            /**
             * @public
             */
            $scope.inviteResearcher = function(){

                if (!Type.isString($scope.newResearcher.email) || $scope.newResearcher.email == '' ||
                    !Type.isString($scope.newResearcher.name) || $scope.newResearcher.name == '') {
                    $scope.validationMsg = 'Required';
                    return;
                }
                $scope.newResearcher.researchId = $scope.researchId;

                ResearchesService.sendInvitation($scope.newResearcher, function(err, res){
                     if (Type.isNull(res)) {
                        $scope.inviteSent = false;
                        $scope.validationMsg = null;
                        $scope.errorMsg = err.data.message;
                    } else {
                        $scope.newResearcher = {};
                        $scope.inviteSent = true;
                        $scope.validationMsg = null;
                    }
                });
            };

            /**
             * @public
             */
            $scope.edit = function() {
                $state.go('add-update-project', {id: $scope.researchId});
            };

            /**
             * @public
             */
            $scope.join = function() {
                var params = {
                    researchId: $scope.researchId,
                    text: "DEF"
                }
                ResearchesService.joinResearch(params, function(err, res){
                     if (Type.isNull(res)) {
                        console.log(err.message);
                    } else {
                        $scope.canJoinProject = false;
                    }
                });
            };

            /**
             * @public
             * @param {Object} user
             */
            $scope.accept = function(user) {
                Assert.isObject(user, 'Invalid "user" type');

                var params = {
                    researchId: $scope.researchId,
                    userId: user.id
                };

                ResearchesService.aproveResearcher(params, function(err, res){
                     if (Type.isNull(res)) {
                        console.log(err.message);
                    } else {
                        $scope._init();
                    }
                });
            };

            /**
             * @public
             * @param {Object} user
             */
            $scope.ignore = function(user) {
                Assert.isObject(user, 'Invalid "user" type');

                var params = {
                    researchId: $scope.researchId,
                    userId: user.id
                };

                ResearchesService.rejectResearcher(params, function(err, res){
                     if (Type.isNull(res)) {
                        console.log(err.message);
                    } else {
                        $scope._init();
                    }
                });
            };

            $scope._init();
    }]);
});