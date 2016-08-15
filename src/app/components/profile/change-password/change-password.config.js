;(function() {
    'use strict';

    angular
        .module('change-password')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('change-password', {
            url: '^/change-password',
            parent: 'restricted-area',
            views: {
                content: {
                    templateUrl: 'components/profile/change-password/change-password.html',
                    controller: 'ChangePasswordController'
                }
            }
        });
    }
})();