'use strict';

define(['angular'], function (angular) {

    angular.module('researchApp.Services').factory('ProfileService', ['RestService', 'Assert',
        function (RestService, Assert) {

            /** @private {String} */
            var _baseUrl = 'users/';

            return {

                /**
                 * @public
                 * @param {Function} callback
                 * @param {String} id
                 */
                getUserProfile: function(id, callback) {
                    Assert.isString(id, 'Invalid "id" type');
                    Assert.isFunction(callback, 'Invalid "callback" type');

                    var url = _baseUrl + id;
                    RestService.getRequest(url, function(err, res) {
                        callback(err, res);
                    });
                },

                /**
                 * @public
                 * @param {Function} callback
                 */
                getInvitations: function(callback) {
                    Assert.isFunction(callback, 'Invalid "callback" type');

                    var url = _baseUrl + 'users/me/invites/researches';
                    RestService.getRequest(url, function(err, res) {
                        callback(err, res);
                    });
                },

                /**
                 * @public
                 * @param {Function} callback
                 * @param {String} id
                 */
                acceptInvitation: function(id, callback) {
                    Assert.isString(id, 'Invalid "id" type');
                    Assert.isFunction(callback, 'Invalid "callback" type');

                    var url = _baseUrl + 'users/me/invites/researches' + id + '/accepted';
                    RestService.postRequest(url, {}, function(err, res) {
                        callback(err, res);
                    });
                },

                /**
                 * @public
                 * @param {Function} callback
                 * @param {String} id
                 */
                declineInvitation: function(id, callback) {
                     Assert.isString(id, 'Invalid "id" type');
                    Assert.isFunction(callback, 'Invalid "callback" type');

                    var url = _baseUrl + 'users/me/invites/researches' + id + '/declined';
                    RestService.postRequest(url, {}, function(err, res) {
                        callback(err, res);
                    });
                }
            };
    }]);
});
