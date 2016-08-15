;(function() {
    'use strict';

    angular
        .module('project.about')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('project.about', {
            url: '/about',
            parent: 'project',
            views: {
                content: {
                    templateUrl: 'components/projects/project/about/about.html'
                }
            }
        });
    }
})();