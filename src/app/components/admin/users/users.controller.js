;(function() {
    'use strict';

    angular
        .module('admin.users')
        .controller('UsersController', UsersController);

    /* ngInject */
    function UsersController($scope, LOAD_LIMIT, ACTIONS, usersService, Assert) {
        /** @public {Array<Object>} */
        $scope.users = [];
        /** @private {Object} */
        $scope.params = {
          selectedAction: null,
          selectedUsers: []
        };
        /** @private {Object} */
        $scope.searchParams = {
            cursor: '',
            keyword: null
        };
        /** @private {Boolean} */
        $scope.loadMoreAvailable = true;
        /** @private {Boolean} */
        $scope.isLoading = false;
        /** @public {Array<Object>} */
        $scope.actions = ACTIONS;


        $scope._init = _init;
        $scope._deleteUsers = _deleteUsers;
        $scope._banUsers = _banUsers;
        $scope.loadMore = loadMore;
        $scope.apply = apply;
        $scope.search = search;
        $scope.restore = restore;
        $scope.setChecked = setChecked;

        function _init() {
            $scope.isLoading = true;
            usersService.queryUsers($scope.searchParams)
                .then(function(res) {
                    $scope.isLoading = false;
                    if ($scope.searchParams.cursor == res.data.cursor) {
                        return;
                    }
                    if (res.data.users.length < LOAD_LIMIT) {
                        $scope.loadMoreAvailable = false;
                    }
                    $scope.searchParams.cursor = res.data.cursor;

                    res.data.users.forEach(function(user) {
                        $scope.users.push(user);
                    });
                }, function(err) {
                    $scope.isLoading = false;
                    $scope.loadMoreAvailable = false;
                });
        };

        function loadMore() {
            if($scope.loadMoreAvailable) {
                $scope._init();
            }
        };

        function apply() {
            if ($scope.params.selectedUsers.length === 0) {
                return;
            }
            switch($scope.params.selectedAction) {
                case '1':
                    $scope._deleteUsers();
                    break;
                case '2':
                    $scope._banUsers();
                    break;
                default:
                    return;
            }
        };

        function _deleteUsers() {
            usersService.deleteUsers({users_ids: $scope.params.selectedUsers})
                .then(function(res) {
                    $scope.users = [];
                    $scope.searchParams.cursor = '';
                    $scope.searchParams.keyword = null;
                    $scope.loadMoreAvailable = true;
                    $scope.params.selectedUsers = [];
                    $scope._init();
                }, function(err) {
                    console.log(err);
                });
        };

        function _banUsers() {
            var params = {
                users_ids: $scope.params.selectedUsers,
                ban_forums: true,
                ban_messages: false
            }
            usersService.banUsers(params)
                .then(function(res) {
                    $scope.users = [];
                    $scope.searchParams.cursor = '';
                    $scope.searchParams.keyword = null;
                    $scope.loadMoreAvailable = true;
                    $scope.params.selectedUsers = [];
                    $scope._init();
                }, function(err) {
                    console.log(err);
                });
        };

        function search() {
            $scope.users = [];
            $scope.searchParams.cursor = '';
            $scope.loadMoreAvailable = true;
            $scope._init();
        };

        /**
        * @param {Object} user
        */
        function restore(user) {
            usersService.restoreUser(user.id)
                .then(function(res) {
                    user.status = 'ACTIVE';
                }, function(err) {
                    console.log(err);
                });
        };

        /**
        * @param {Object} user
        */
        function setChecked(user) {
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
    }
})();