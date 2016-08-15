;(function() {
    'use strict';

    angular
        .module('admin.users')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('admin.users', {
            url: '/users',
            parent: 'admin',
            views: {
                content: {
                    templateUrl: 'components/admin/users/users.html',
                    controller: 'UsersController'
                }
            }
        });
    }
})();