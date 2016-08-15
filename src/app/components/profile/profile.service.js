;(function() {
    'use strict';

    angular
        .module('profile')
        .factory('profileService', profileService);

    /* ngInject */
    function profileService($http, API_URL, Assert) {
        return {
            getUserProfile: getUserProfile,
            saveUsersProfileData: saveUsersProfileData,
            getInvitations: getInvitations,
            acceptInvitation: acceptInvitation,
            declineInvitation: declineInvitation,
            changePassword: changePassword
        };

        function getUserProfile(id) {
            return $http.get(API_URL + 'users/' + id);
        }

        function saveUsersProfileData(params) {
            Assert.isObject(params, 'Invalid "params" type');
            return $http.put(API_URL + 'users', params);
        }

        function getInvitations() {
            return $http.get(API_URL + 'users/me/invites/researches');
        }

        function acceptInvitation(id) {
            return $http.post(API_URL + 'users/me/invites/researches/' + id + '/accepted', {});
        }

        function declineInvitation(id) {
            return $http.post(API_URL + 'users/me/invites/researches/' + id + '/declined', {});
        }

        function changePassword(params) {
            Assert.isObject(params, 'Invalid "params" type');
            return $http.put(API_URL + 'users/me/password', params);
        }
    }
})();