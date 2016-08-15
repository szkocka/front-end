;(function() {
    'use strict';

    angular
        .module('admin.projects')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('admin.projects', {
            url: '/projects',
            parent: 'admin',
            views: {
                content: {
                    templateUrl: 'components/admin/projects/projects.html',
                    controller: 'ProjectsController'
                }
            }
        });
    }
})();