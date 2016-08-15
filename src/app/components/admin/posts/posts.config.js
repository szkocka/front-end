;(function() {
    'use strict';

    angular
        .module('admin.posts')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('admin.posts', {
            url: '/posts/:userId/:userName',
            parent: 'admin',
            views: {
                content: {
                    templateUrl: 'components/admin/posts/posts.html',
                    controller: 'PostsController'
                }
            }
        });
    }
})();