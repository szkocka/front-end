'use strict';

define(['angular'], function (angular) {

    angular.module('researchApp')
        .factory('User', ['$resource',
        function ($resource) {
          return $resource(API_URL + 'users/:id/:controller', {
            id: '@_id'
          },
          {
            changePassword: {
              method: 'PUT',
              params: {
                controller:'password'
              }
            },
            get: {
              method: 'GET',
              params: {
                id:'me'
              }
            }
          });
    }]);
});
