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
                projectsService: 'projectsService',
                UpdateResolver: UpdateResolver
            },
            views: {
                content: {
                    templateUrl: 'components/projects/update/update.html',
                    controller: 'UpdateController'
                }
            }
        });
    }

    /* ngInject */
    function UpdateResolver(projectsService, $stateParams) {
        return projectsService.getProjectById($stateParams.id);
    }
})();