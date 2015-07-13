'use strict';

angular.module('researchApp')
  .controller('NewProjectCtrl', function ($scope, $http, socket, Upload) {
    $scope.projectsList = [];

    $http.get('/api/projects').success(function(projectsList) {
      $scope.projectsList = projectsList;
      socket.syncUpdates('project', $scope.projectsList);
    });

    $scope.addProject = function() {
      if ($scope.newProject.title === '') {
        return;
      }
      $http.post('/api/projects',
        {
          title: $scope.newProject.title,
          image: $scope.uploadedImage,
          description: {
            brief: $scope.newProject.description.brief,
            detailed: $scope.newProject.description.detailed
          }
        });
      $scope.newProject = {};
    };

    $scope.onFileSelect = function(event) {
      var image = event.target.files[0];
      
      if (image.type !== 'image/png' && image.type !== 'image/jpeg') {
          alert('Only PNG and JPEG are accepted.');
          return;
      }

      $scope.upload = Upload.upload({
          url: '/api/projects/upload',
          method: 'POST',
          file: image
      }).success(function(data, status, headers, config) {
          $scope.uploadedImage = '/api/projects/upload/' + data;      
      }).error(function(err) {
          console.log('Error uploading file: ' + err.message || err);
      });
    };

    $scope.deleteProject = function(project) {
      $http.delete('/api/projects/' + project._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('project');
    });
  });