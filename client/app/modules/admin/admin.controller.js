'use strict';

define(['angular'], function (angular) {
    angular.module('researchApp.Controllers').controller('AdminCtrl', 
        ['$scope', 'User', 'AppSettings', 'Assert',
        function ($scope, User, AppSettings, Assert) {
            /** @public {Array<Object>} */
            $scope.users = [];
            /** @private {Object} */
            $scope.params = {
              selectedAction: null,
              selectedRole: null,
              selectedUsers: []
            };
            /** @private {Object} */
            $scope.cursor = '';
            /** @private {String} */
            $scope.loadMoreAvailable = true;
            /** @private {Number} */
            $scope.limit = AppSettings.getLoadLimit();
            /** @public {String} */
            $scope.errorMsg = null;
            /** @public {Array<Object>} */
            $scope.actions = [
              {
                id: '1',
                name: 'Delete user'
              },
              {
                id: '2',
                name: 'Delete user and posts'
              },
              {
                id: '3',
                name: 'Ban user'
              },
              {
                id: '4',
                name: 'Ban user and delete posts'
              }
            ];
            /** @public {Array<Object>} */
            $scope.roles = [
              {
                id: 'admin',
                name: 'Admin'
              },
              {
                id: 'user',
                name: 'User'
              }
            ];

            /**
             * @private
             */
            $scope._init = function() {
                $scope.errorMsg = null;

                User.query({cursor: $scope.cursor}, function(res){
                    if ($scope.cursor == res.cursor) {
                        return;
                    }
                    if (res.users.length < $scope.limit) {
                        $scope.loadMoreAvailable = false;
                    }
                    $scope.cursor = res.cursor;

                    res.users.forEach(function(user) {
                        $scope.users.push(user);
                    });
                }, function() {
                    $scope.loadMoreAvailable = false;
                });
            };

            /**
             * @public
             */
            $scope.loadMore = function() {
                if($scope.loadMoreAvailable) {
                    $scope._init();
                }
            };

            /**
             * @public
             */
            $scope.apply = function() {
                switch($scope.params.selectedAction) {
                    case '1':
                        console.log('Delete user');
                        break;
                    case '2':
                        console.log('Delete user and posts');
                        break;
                    case '3':
                        console.log('Ban user');
                        break;
                    case '4':
                        console.log('Ban user and posts');
                        break;
                    default:
                        return;
                }
            };

            /**
             * @public
             */
            $scope.changeRole = function() {
                switch($scope.params.selectedRole) {
                    case 'admin':
                        console.log('Admin');
                        break;
                    case 'user':
                        console.log('User');
                        break;
                    default:
                        return;
                }
            };

            /**
             * @public
             */
            $scope.search = function() {
                console.log('Search');
            };

            /**
             * @public
             */
            $scope.restore = function() {
                console.log('restore');
            };

            /**
            * @public
            * @param {Object} user
            */
            $scope.setChecked = function(user) {
                Assert.isObject(user, 'Invalid "user" type');

                if (user.checked) {
                    $scope.params.selectedUsers.push(user.id)
                } else {
                    _.remove($scope.params.selectedUsers, function(userId) {
                        return userId == user.id;
                    });
                }
            };

            $scope._init();
    }]);
});
