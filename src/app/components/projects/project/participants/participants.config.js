;(function() {
    'use strict';

    angular
        .module('project.participants')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('project.participants', {
            url: '/participants',
            parent: 'project',
            views: {
                content: {
                    templateUrl: 'components/projects/project/participants/participants.html',
                    controller: 'ProjectParticipantsController'
                }
            }
        });
    }
})();