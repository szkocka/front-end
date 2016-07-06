'use strict';

define(['angular'], function (angular) {

    angular.module('researchApp.Services').factory('ResearchesService',
        ['RestService', 'Assert', 'Type',
        function (RestService, Assert, Type) {

            /** @private {String} */
            var _researchesQueryUrl = 'queries/researches';
            /** @private {String} */
            var _researchesUrl = 'researches/';
            /** @private {String} */
            var _tagsUrl = 'researches/tags';

            return {

                /**
                 * @public
                 * @param {Function} callback
                 */
                getTags: function(callback) {
                    Assert.isFunction(callback, 'Invalid "callback" type');

                    var url = _tagsUrl;

                    RestService.getRequest(url, function(err, res) {
                        callback(err, res);
                    });
                },

                /**
                 * @public
                 * @param {Object} params
                 * @param {Function} callback
                 */
                queryResearches: function(params, callback) {
                    Assert.isObject(params, 'Invalid "params" type');
                    Assert.isFunction(callback, 'Invalid "callback" type');

                    var _createQuery = function(data) {
                        var params = [];

                        if (!Type.isNull(data.keyword) && data.keyword != '') {
                            var keyword = 'keyword=' + data.keyword;
                            params.push(keyword);
                        }

                        if (!Type.isNull(data.status)) {
                             var status = 'status=' + data.status;
                            params.push(status);
                        }

                        if (!Type.isNull(data.tag)) {
                            var tag = 'tag=' + data.tag;
                            params.push(tag);
                        }

                        if (data.page != '') {
                            var page = 'page=' + data.page;
                            params.push(page);
                        }
                        return params.join('&');
                    };

                    var url = _researchesQueryUrl + '?' + _createQuery(params);

                    RestService.getRequest(url, function(err, res) {
                        callback(err, res);
                    });
                },

                /**
                 * @public
                 * @param {String} id
                 * @param {Function} callback
                 */
                getResearchById: function(id, callback) {
                    Assert.isString(id, 'Invalid "id" type');
                    Assert.isFunction(callback, 'Invalid "callback" type');

                    var url = _researchesUrl + id;

                    RestService.getRequest(url, function(err, res) {
                        callback(err, res);
                    });
                },

                /**
                 * @public
                 * @param {String} id
                 * @param {Function} callback
                 */
                getJoinRequests: function(id, callback) {
                    Assert.isString(id, 'Invalid "id" type');
                    Assert.isFunction(callback, 'Invalid "callback" type');

                    var url = _researchesUrl + id + '/requests';

                    RestService.getRequest(url, function(err, res) {
                        callback(err, res);
                    });
                },

                /**
                 * @public
                 * @param {Object} params
                 * @param {Function} callback
                 */
                sendInvitation: function(params, callback) {
                    Assert.isObject(params, 'Invalid "params" type');
                    Assert.isFunction(callback, 'Invalid "callback" type');

                    var url = _researchesUrl + params.researchId + '/invites';

                    RestService.postRequest(url, params, function(err, res) {
                          callback(err, res);
                    })
                },

                /**
                 * @public
                 * @param {Object} params
                 * @param {Function} callback
                 */
                joinResearch: function(params, callback) {
                    Assert.isObject(params, 'Invalid "params" type');
                    Assert.isFunction(callback, 'Invalid "callback" type');

                    var url = _researchesUrl + params.researchId + '/requests';

                    RestService.postRequest(url, params, function(err, res) {
                          callback(err, res);
                    })
                },

                /**
                 * @public
                 * @param {Object} params
                 * @param {Function} callback
                 */
                aproveResearcher: function(params, callback) {
                    Assert.isObject(params, 'Invalid "params" type');
                    Assert.isFunction(callback, 'Invalid "callback" type');

                    var url = _researchesUrl + params.researchId + '/researchers/' + params.userId + '/approved';

                    RestService.postRequest(url, {}, function(err, res) {
                          callback(err, res);
                    })
                },

                 /**
                 * @public
                 * @param {Object} params
                 * @param {Function} callback
                 */
                rejectResearcher: function(params, callback) {
                    Assert.isObject(params, 'Invalid "params" type');
                    Assert.isFunction(callback, 'Invalid "callback" type');

                    var url = _researchesUrl + params.researchId + '/researchers/' + params.userId + '/rejected';

                    RestService.postRequest(url, {}, function(err, res) {
                          callback(err, res);
                    })
                }

            };
    }]);
});
