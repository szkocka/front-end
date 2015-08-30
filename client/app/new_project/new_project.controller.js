'use strict';

angular.module('researchApp')
  .controller('NewProjectCtrl', function ($scope, $http, Upload) {
    $scope.projectsList = [];
    $scope.newProject = {};

    $http.get(API_URL + 'researches').success(function(projectsList) {
      $scope.projectsList = projectsList;
    });

    $scope.addProject = function() {
      if ($scope.newProject.title === '') {
        return;
      }
      $http.post(API_URL + 'researches',
        {
          title: $scope.newProject.title,
          tags: _.map($scope.newProject.tags, function(t){return t.text}),
          // image: $scope.newProject.image,
          area: 'test area',
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
          url: API_URL + 'researches/upload',
          method: 'POST',
          file: image
      }).success(function(data, status, headers, config) {
          $scope.newProject.image = API_URL + 'researches/upload/' + data;      
      }).error(function(err) {
          console.log('Error uploading file: ' + err.message || err);
      });
    };

    $scope.deleteProject = function(project) {
      $http.delete(API_URL + 'researches/' + project._id);
    };
  });
