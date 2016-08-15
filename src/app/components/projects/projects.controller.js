;(function() {
    'use strict';

    angular
        .module('projects')
        .controller('ProjectsController', ProjectsController);

    /* ngInject */
    function ProjectsController($scope, accountService, projectsService) {
        /** @private {String} */
        $scope.userId = accountService.getCurrentUser()._id;
        /** @public {Object} */
        $scope.user = {};

        $scope._init = _init;

        function _init() {
            projectsService.getUserProfile($scope.userId)
                .then(function(res) {
                    $scope.user = res.data;
                }, function() {
                    console.log(err.message);
                });
        };

        $scope._init();
    }
})();