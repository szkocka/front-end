;(function() {
    'use strict';

    angular
        .module('project.participants')
        .controller('ProjectParticipantsController', ProjectParticipantsController);

    /* ngInject */
    function ProjectParticipantsController($scope, projectsService, Assert) {
        /** @public {Boolean} */
        $scope.inviteSent = false;
        /** @public {Object} */
        $scope.newResearcher = {};

        $scope.inviteResearcher = inviteResearcher;

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

            projectsService.sendInvitation($scope.newResearcher)
                .then(function(res) {
                    $scope.newResearcher = {};
                    $scope.inviteSent = true;
                }, function(err) {
                    $scope.inviteSent = false;
                    console.log(err.message);
                });
        };
    }
})();