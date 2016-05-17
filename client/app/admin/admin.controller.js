'use strict';

angular.module('researchApp')
  .controller('AdminCtrl', function ($scope, $http) {

    // Use the User $resource to fetch all users
    $scope.users = [];
    $scope.params = {
        selectedAction: null,
        selectedRole: null,
        selectedUsers: []
    }
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

    _init();

    function _init() {
      //$scope.users = User.query();
    }

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

    $scope.search = function() {
      console.log('Search');
    };

    $scope.restore = function() {
      console.log('restore');
    };

    /**
     * @public
     * @param {Object} wo
     * @param {Boolean} checked
     */
    $scope.setChecked = function(user) {
        if (user.checked) {
          $scope.params.selectedUsers.push(user.id)
        } else {
          _.remove($scope.params.selectedUsers, function(userId) {
            return userId == user.id;
          });
        }
    };
  });
