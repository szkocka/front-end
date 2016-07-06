'use strict';

define(['angular'], function (angular) {

    angular.module('researchApp.Services').factory('MessagesService',
    	['RestService', 'Assert', 'Type',
        function (RestService, Assert, Type) {
        	/** @private {String} */
            var _baseUrl = 'forums/';

            return {

                /**
                 * @public
                 * @param {Object} params
                 * @param {Function} callback
                 */
                getForumMessages: function(params, callback) {
                    Assert.isFunction(callback, 'Invalid "callback" type');
                    Assert.isObject(params, 'Invalid "params" type');
                    Assert.isString(params.forumId, 'Invalid "params.forumId" type');

                    /** @private {String} */
                    var query = '';

                    if (Type.isNull(params.cursor)) {
                        query = params.forumId + '/messages';
                    } else {
                    	query = params.forumId + '/messages?cursor=' + params.cursor;
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
                createNewMessage: function(params, callback) {
                    Assert.isObject(params, 'Invalid "params" type');
                    Assert.isString(params.forumId, 'Invalid "params.forumId" type');
                    Assert.isString(params.message, 'Invalid "params.message" type');
                    Assert.isFunction(callback, 'Invalid "callback" type');

                    var url = _baseUrl + params.forumId + '/messages';
                    RestService.postRequest(url, params, function(err, res) {
                          callback(err, res);
                    })
                }
            };
    }]);
});