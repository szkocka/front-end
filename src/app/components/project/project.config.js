;(function() {
    'use strict';

    angular
        .module('project')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('project', {
            url: '^/project/:id',
            parent: 'restricted-area',
            views: {
                content: {
                    templateUrl: 'components/project/project.html',
                    controller: 'ProjectController'
                }
            }
        });
    }
})();