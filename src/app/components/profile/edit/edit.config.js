;(function() {
    'use strict';

    angular
        .module('profile.edit')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('profile-edit', {
            url: '^/profile-edit/:id',
            parent: 'restricted-area',
            resolve: {
                profileService: 'profileService',
                userProfileResolver: userProfileResolver
            },
            views: {
                content: {
                    templateUrl: 'components/profile/edit/edit.html',
                    controller: 'ProfileEditController'
                }
            }
        });
    }

    /* ngInject */
    function userProfileResolver(profileService, $stateParams) {
        return profileService.getUserProfile($stateParams.id);
    }
})();