'use strict';

define(['angular'], function (angular) {

    angular.module('researchApp.Services').factory('NewsService', ['RestService', 'Assert', 'Type',
        function (RestService, Assert, Type) {
            /** @private {String} */
            var _baseUrl = 'news';

            return {
                /**
                 * @public
                 * @param {Function} callback
                 */
                getNews: function(cursor, callback) {
                    Assert.isFunction(callback, 'Invalid "callback" type');

                    /** @private {String} */
                    var query = '';

                    if (!Type.isNull(cursor)) {
                        query = '?cursor=' + cursor;
                    }

                    var url = _baseUrl + query;
                    RestService.getRequest(url, function(err, res) {
                        callback(err, res);
                    });
                },

                /**
                 * @public
                 * @param {Object} params
                 * @param {Function} callback
                 */
                createNews: function(params, callback) {
                    Assert.isObject(params, 'Invalid "params" type');
                    Assert.isString(params.title, 'Invalid "params.title" type');
                    Assert.isString(params.body, 'Invalid "params.body" type');
                    Assert.isString(params.image_url, 'Invalid "params.image_url" type');
                    Assert.isFunction(callback, 'Invalid "callback" type');

                    var url = _baseUrl;
                    RestService.postRequest(url, params, function(err, res) {
                          callback(err, res);
                    })
                }
            };
    }]);
});