;(function() {
    'use strict';

    angular
        .module('projects')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('projects', {
            url: '^/projects',
            parent: 'restricted-area',
            views: {
                content: {
                    templateUrl: 'components/projects/projects.html',
                    controller: 'ProjectsController'
                }
            }
        });
    }
})();