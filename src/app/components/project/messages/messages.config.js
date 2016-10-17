;(function() {
    'use strict';

    angular
        .module('project-messages')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('project-messages', {
            url: '^/project-messages/:projectId/:forumId/:isSupervisor',
            parent: 'restricted-area',
            views: {
                content: {
                    templateUrl: 'components/project/messages/messages.html',
                    controller: 'ForumMessagesController'
                }
            }
        });
    }
})();