;(function() {
    'use strict';

    angular
        .module('project.messages')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('project.messages', {
            url: '/:forumId',
            parent: 'project',
            views: {
                content: {
                    templateUrl: 'components/project/forum/messages/messages.html',
                    controller: 'ForumMessagesController'
                }
            }
        });
    }
})();