'use strict';

define(['angular'], function (angular) {

    angular.module('researchApp.Services')
        .factory('RestService', ['$http', 'AppSettings', 'Assert',
        function (http, AppSettings, Assert) {

        /** @private {Object} */
        var restService = {};

        /**
         * @private
         * @return {String}
         */
        restService._getBaseUrl = function() {
            return AppSettings.getAppServer();
        };

        /**
         * @public
         * @param {String} url
         * @param {Function} callback
         */
        restService.getRequest = function(url, callback) {
            Assert.isString(url, 'Invalid "url" type');
            Assert.isFunction(callback, 'Invalid "callback" type');

            var fullUrl = this._getBaseUrl() + url;

            http.get(fullUrl).then(
                function(response) {
                    callback(null, response);
                },
                function(response) {
                    callback(response, null);
                }
            );
        };

        /**
         * @public
         * @param {String} url
         * @param {Object} data
         * @param {Function} callback
         */
        restService.postRequest = function(url, data, callback) {
            Assert.isString(url, 'Invalid "url" type');
            Assert.isObject(data, 'Invalid "data" type');
            Assert.isFunction(callback, 'Invalid "callback" type');

            var fullUrl = this._getBaseUrl() + url;

            http.post(fullUrl, data).then(
                function(response) {
                    callback(null, response);
                },
                function(response) {
                    callback(response, null);
                }
            );
        };

        /**
         * @public
         * @param {String} url
         * @param {Object} data
         * @param {Function} callback
         */
        restService.putRequest = function(url, data, callback) {
            Assert.isString(url, 'Invalid "url" type');
            Assert.isObject(data, 'Invalid "data" type');
            Assert.isFunction(callback, 'Invalid "callback" type');

            var fullUrl = this._getBaseUrl() + url;

            http.put(fullUrl, data).then(
                function(response) {
                    callback(null, response);
                },
                function(response) {
                    callback(response, null);
                }
            );
        };

        /**
         * @public
         * @param {String} url
         * @param {Function} callback
         */
        restService.deleteRequest = function(url, callback) {
            Assert.isString(url, 'Invalid "url" type');
            Assert.isFunction(callback, 'Invalid "callback" type');

            var fullUrl = this._getBaseUrl() + url;

            http.delete(fullUrl).then(
                function(response) {
                    callback(null, response);
                },
                function(response) {
                    callback(response, null);
                }
            );
        };

        return restService;

      }]);
});