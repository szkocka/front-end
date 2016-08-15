;(function() {
    'use strict';

    angular
        .module('project.forum')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('project.forum', {
            url: '/forum',
            parent: 'project',
            views: {
                content: {
                    templateUrl: 'components/projects/project/forum/forum.html',
                    controller: 'ProjectForumController'
                }
            }
        });
    }
})();