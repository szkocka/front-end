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
            views: {
                content: {
                    templateUrl: 'components/project/update/update.html',
                    controller: 'UpdateController'
                }
            }
        });
    }
})();