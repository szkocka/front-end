;(function() {
    'use strict';

    angular
        .module('project-update')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('project-update', {
            url: '^/project-update/:id',
            parent: 'restricted-area',
            resolve: {
                projectService: 'projectService',
                UpdateResolver: UpdateResolver
            },
            views: {
                content: {
                    templateUrl: 'components/project/update/update.html',
                    controller: 'UpdateController'
                }
            }
        });
    }

    /* ngInject */
    function UpdateResolver(projectService, $stateParams) {
        return projectService.getProjectById($stateParams.id);
    }
})();