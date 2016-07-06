'use strict';
define(['angular'], function (angular) {

    angular.module('researchApp.Services').factory('Auth', 
        ['User', '$cookieStore', '$q', 'Assert', 'Type', 'CacheStore', 'RestService',
        function (User, $cookieStore, $q, Assert, Type, CacheStore, RestService) {
            /** @private {String} */
            var _userLabel = 'userInfo';
            /** @private {Object} */
            var _currentUser = {};

            return {
                /**
                 * Initialize Authentication Service
                 * get current user
                 * @return {Promise}
                 */
                init: function() {
                    var deferred = $q.defer();
                    var token = this.getToken();
                    if (Type.isString(token) && CacheStore.itemExist(_userLabel)) {
                        _currentUser = CacheStore.getItem(_userLabel);
                        deferred.resolve();
                    } else if (Type.isString(token) && !CacheStore.itemExist(_userLabel)){
                        User.get(function(user) {
                            _currentUser = user;
                            CacheStore.cacheItem(_userLabel, _currentUser);
                            deferred.resolve();
                        });
                    }
                    return deferred.promise;
                },

                /**
                 * Authenticate user and save token
                 * public
                 * @param  {Object}   user     - login info
                 * @param  {Function} callback - optional
                 * @return {Promise}
                 */
                login: function(user, callback) {
                    Assert.isObject(user, 'Invalid "user" type');
                    Assert.isString(user.email, 'Invalid "user.email" type');
                    Assert.isString(user.password, 'Invalid "user.password" type');

                    var cb = callback || angular.noop;
                    var self = this;
                    var deferred = $q.defer();
                    var url = 'auth/local';

                    RestService.postRequest(url, user, function(err, res) {
                        if (Type.isNull(res)) {
                            self.logout();
                            deferred.reject(err);
                            return cb(err);
                        } else {
                            $cookieStore.put('token', res.data.token);
                            User.get(function(user) {
                                _currentUser = user;
                                CacheStore.cacheItem(_userLabel, _currentUser);
                                deferred.resolve(res.data);
                                return cb();
                            });
                        }
                    });

                    return deferred.promise;
                },

                /**
                 * Delete access token and user info
                 * public
                 */
                logout: function() {
                    $cookieStore.remove('token');
                    CacheStore.clear();
                    _currentUser = {};
                },

                /**
                 * Create a new user
                 *
                 * @param  {Object}   user     - user info
                 * @param  {Function} callback - optional
                 * @return {Promise}
                 */
                createUser: function(user, callback) {
                    Assert.isObject(user, 'Invalid "user" type');
                    
                    var cb = callback || angular.noop;
                    var self = this;
                    
                    return User.save(user, function(data) {
                        $cookieStore.put('token', data.token);
                        User.get(function(user) {
                            _currentUser = user;
                            CacheStore.cacheItem(_userLabel, _currentUser);
                            return cb(user);
                        });
                    },
                    function(err) {
                        self.logout();
                        return cb(err);
                    }).$promise;
                },

                /**
                 * Change password
                 * public
                 * @param  {String}   oldPassword
                 * @param  {String}   newPassword
                 * @param  {Function} callback    - optional
                 * @return {Promise}
                 */
                changePassword: function(oldPassword, newPassword, callback) {
                    Assert.isString(oldPassword, 'Invalid "oldPassword" type');
                    Assert.isString(newPassword, 'Invalid "newPassword" type');
                    
                    var cb = callback || angular.noop;

                    return User.changePassword({ id: _currentUser._id }, {
                        oldPassword: oldPassword,
                        newPassword: newPassword
                    }, function(user) {
                        return cb(user);
                    }, function(err) {
                        return cb(err);
                    }).$promise;
                },

                /**
                 * Gets all available info on authenticated user
                 * public
                 * @return {Object} user
                 */
                getCurrentUser: function() {
                  return _currentUser.user;
                },

                /**
                 * Check if a user is logged in
                 *
                 * @return {Boolean}
                 */
                isLoggedIn: function() {
                  return ('user' in _currentUser && 'role' in _currentUser.user);
                },

                /**
                 * Waits for currentUser to resolve before checking if user is logged in
                 * public
                 * @param  {Function} callback - optional
                 */
                isLoggedInAsync: function(cb) {
                    User.get(function(user) {
                        if(user.hasOwnProperty('$promise')) {
                            user.$promise.then(function() {
                                cb(true);
                            }).catch(function() {
                                cb(false);
                            });
                        } else if(user.hasOwnProperty('role')) {
                            cb(true);
                        } else {
                            cb(false);
                        }
                    });
                },

                /**
                 * Check if a user is an admin
                 * public
                 * @return {Boolean}
                 */
                isAdmin: function() {
                  if (!_currentUser.user) {
                    return false;
                  }
                  return _currentUser.user.role === 'admin';
                },

                /**
                 * Get auth token
                 * public
                 * @return {String}
                 */
                getToken: function() {
                  return $cookieStore.get('token');
                }
            };
    }]);
});
