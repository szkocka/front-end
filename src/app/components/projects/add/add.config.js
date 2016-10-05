;(function() {
    'use strict';

    angular
        .module('add')
        .config(config);

    /* ngInject */
    function config($stateProvider, $mdIconProvider) {
        $mdIconProvider.icon('md-close', '', 24);
        $stateProvider.state('add', {
            url: '^/add',
            parent: 'restricted-area',
            views: {
                content: {
                    templateUrl: 'components/projects/add/add.html',
                    controller: 'AddController'
                }
            }
        });
    }
})();