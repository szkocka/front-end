'use strict';

define(['angular'], function (angular) {

    angular.module('researchApp.Services')
        .factory('RestService', ['User', '$http',
        function (User, $http) {
          return {};
    }]);
});