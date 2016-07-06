'use strict';

define(['angular'], function (angular) {

    angular.module('researchApp.Services').factory('ForumsService', ['RestService', 'Assert', 'Type',
        function (RestService, Assert, Type) {
          	/** @private {String} */
            var _baseUrl = 'researches/';

            return {

                /**
                 * @public
                 * @param {String} id
                 * @param {Function} callback
                 */
                getForumById: function(id, callback) {
                    Assert.isFunction(callback, 'Invalid "callback" type');
                    Assert.isString(id, 'Invalid "id" type');

                    var url = 'forums/' + id;
                    RestService.getRequest(url, function(err, res) {
                        callback(err, res);
                    });
                },

                /**
                 * @public
                 * @param {Object} params
                 * @param {Function} callback
                 */
                getForums: function(params, callback) {
                    Assert.isFunction(callback, 'Invalid "callback" type');
                    Assert.isObject(params, 'Invalid "params" type');
                    Assert.isString(params.researchId, 'Invalid "params.researchId" type');

                    /** @private {String} */
                    var query = '';

                    if (Type.isNull(params.cursor)) {
                        query = '/forums';
                    } else {
                    	query = '/forums?cursor=' + params.cursor;
                    }
                    var url = _baseUrl + params.researchId + query;

                    RestService.getRequest(url, function(err, res) {
                        callback(err, res);
                    });
                },

                /**
                 * @public
                 * @param {Object} params
                 * @param {Function} callback
                 */
                createNewForum: function(params, callback) {
                    Assert.isObject(params, 'Invalid "params" type');
                    Assert.isString(params.researchId, 'Invalid "params.researchId" type');
                    Assert.isString(params.subject, 'Invalid "params.subject" type');
                    Assert.isFunction(callback, 'Invalid "callback" type');

                    var url = _baseUrl + params.researchId + '/forums';
                    
                    RestService.postRequest(url, params, function(err, res) {
                          callback(err, res);
                    })
                }
            };

    }]);
});