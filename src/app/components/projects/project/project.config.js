;(function() {
    'use strict';

    angular
        .module('project')
        .config(config);

    /* ngInject */
    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('/project/:id', '/project/:id/about');
        $stateProvider.state('project', {
            url: '^/project/:id',
            parent: 'restricted-area',
            views: {
                content: {
                    templateUrl: 'components/projects/project/project.html',
                    controller: 'ProjectController'
                }
            }
        });
    }
})();