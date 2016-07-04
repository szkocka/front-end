'use strict';

define(['angular'], function (angular) {

    angular.module('researchApp.Services').factory('ProfileService', ['RestService', 'Assert',
        function (RestService, Assert) {

            /** @private {String} */
            var _baseUrl = 'pages/about';

            return {

                /**
                 * @public
                 * @param {Function} callback
                 */
                getAboutInfo: function(callback) {
                    Assert.isFunction(callback, 'Invalid "callback" type');

                    var url = _baseUrl;
                    RestService.getRequest(url, function(err, res) {
                        callback(err, res);
                    });
                },

                /**
                 * @public
                 * @param {Object} params
                 * @param {Function} callback
                 */
                updateAboutInfo: function(params, callback) {
                    Assert.isObject(params, 'Invalid "params" type');
                    Assert.isString(params.content, 'Invalid "params.content" type');
                    Assert.isFunction(callback, 'Invalid "callback" type');

                    var url = _baseUrl;
                    RestService.postRequest(url, params, function(err, res) {
                        callback(err, res);
                    });
                }
            };
    }]);
});
