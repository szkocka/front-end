;(function() {
    'use strict';

    angular
        .module('project')
        .controller('ProjectController', ProjectController);

    /* ngInject */
    function ProjectController($scope, $state, $stateParams, accountService, 
        projectService, Assert, Type) {
        /** @private {Number} */
        $scope.projectId = $stateParams.id;
        /** @private {Object} */
        $scope.project = {}
        /** @public {Object} */
        $scope.newResearcher = {};
        /** @public {Object} */
        $scope.user = accountService.getCurrentUser();
        /** @public {Array<Object>} */
        $scope.joinRequests = [];
        /** @public {Boolean} */
        $scope.isSupervisor = false;
        /** @public {Boolean} */
        $scope.canJoinProject = false;
        /** @public {Boolean} */
        $scope.showInvitation = false;
        /** @public {Boolean} */
        $scope.inviteSent = false;

        $scope._init = _init;
        $scope._getJoinRequests = _getJoinRequests;
        $scope.edit = edit;
        $scope.join = join;
        $scope.accept = accept;
        $scope.ignore = ignore;

        $scope.show = show;
        $scope.cancel = cancel;
        $scope.inviteResearcher = inviteResearcher;

        function _init() {
            projectService.getProjectById($scope.projectId).then(function(res) {
                $scope.project = res.data;

                if($scope.project.relationship_type === 'NONE') {
                    $scope.canJoinProject = true;
                }

                if($scope.user && $scope.user._id == $scope.project.supervisor.id ){
                    $scope.isSupervisor = true;
                    $scope._getJoinRequests();
                }
            }, function(err) {
                console.log(err);
            });
        };

        function _getJoinRequests() {
            projectService.getJoinRequests($scope.project.id)
                .then(function(res) {
                    $scope.joinRequests = res.data.users;

                    if (_.any($scope.joinRequests, function(request) {
                        return request.id == $scope.user._id;
                    })) {
                        $scope.canJoinProject = false;
                    }
                }, function(err) {
                    console.log(err.message);
                });
        };

        function edit() {
            $state.go('project-update', {id: $scope.project.id});
        };

        function join() {
            projectService.joinResearch({id: $scope.project.id, text: "DEF"})
                .then(function(res) {
                    $scope.canJoinProject = false;
                }, function(err) {
                    console.log(err.message);
                });
        };

        /**
         * @param {Object} user
         */
        function accept(user) {
            Assert.isObject(user, 'Invalid "user" type');

            var params = {
                researchId: $scope.project.id,
                userId: user.id
            };

            projectService.aproveResearcher(params)
                .then(function(res) {
                    $scope._init();
                }, function(err) {
                    console.log(err.message);
                });
        };

        /**
         * @param {Object} user
         */
        function ignore(user) {
            Assert.isObject(user, 'Invalid "user" type');

            var params = {
                researchId: $scope.project.id,
                userId: user.id
            };

            projectService.rejectResearcher(params)
                .then(function(res) {
                     $scope._getJoinRequests();
                }, function(err) {
                    console.log(err.message);
                });
        };

        function show() {
            $scope.showInvitation = true;
        };

        function cancel() {
            $scope.showInvitation = false;
        };

        /**
         * @param {Boolean} valid
         * @param {Object} e
         */
        function inviteResearcher(valid, e){
            Assert.isBoolean(valid, 'Invalid "valid" type');
            e.preventDefault();

            if (!valid) {
                return;
            }
            $scope.newResearcher.researchId = $scope.project.id;

            projectService.sendInvitation($scope.newResearcher)
                .then(function(res) {
                    $scope.newResearcher = {};
                    $scope.showInvitation = false;
                }, function(err) {
                    console.log(err.message);
                });
        };

        $scope._init();
    }
})();