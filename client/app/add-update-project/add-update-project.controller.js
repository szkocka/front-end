'use strict';

angular.module('researchApp')
  .controller('AddUpdateProjectCtrl', function ($scope, $http, Upload, $state, $stateParams,Auth) {
    $scope.projectId = $stateParams.id;
    $scope.user = Auth.getCurrentUser();
    $scope.img = null;
    $scope.newProject = true;
    $scope.project = {};
    $scope.statuses = [
      {
        id: 'active',
        name: 'Active'
      },
      {
        id: 'closed',
        name: 'Closed'
      },
      {
        id: 'onhold',
        name: 'On Hold'
      }
    ];
    init();

    function init() {
      if($scope.projectId === 'null') {
        return;
      } else {
        $scope.newProject = false;
        $http.get(API_URL + 'researches/' + $stateParams.id).success(function(project) {
          $scope.project = project;
          var tags = [];
          $scope.project.tags.forEach(function(tagItem) {
            var tag = {};
            tag.text = tagItem;
            tags.push(tag);
          });
          $scope.project.tags = tags;
          $scope.img = $scope.project.image_url;
        });
      }
      
    }

    $scope.addProject = function() {
      if ($scope.project.title === '') {
        return;
      }
      $http.post(API_URL + 'researches',
        {
          title: $scope.project.title,
          tags: _.map($scope.project.tags, function(t){return t.text}),
          image_url: $scope.img,
          area: 'test area',
          description: {
            brief: $scope.project.description.brief,
            detailed: $scope.project.description.detailed
          }
        }).success(function(research){
          /*
              create default forum for research
          */
          $http.post(API_URL + 'researches/' + research.research_id+ '/forums', {
            subject: 'Default forum'
          }).success(function(forum){
            $state.go('project.about', {id: research.research_id});
          });
        });
      $scope.project = {};
    };

    $scope.updateProject = function() {
      $http.put(API_URL + 'researches/' + $stateParams.id,
        {
          title: $scope.project.title,
          tags: _.map($scope.project.tags, function(t){return t.text}),
          image_url: $scope.img,
          area: 'test area',
          status: $scope.project.status,
          description: {
            brief: $scope.project.description.brief,
            detailed: $scope.project.description.detailed
          }
        }).success(function(research){
          $state.go('project.about', {id: $scope.projectId});
        });
    };

    $scope.removeResearcher = function(researcher) {
      console.log(researcher);
    }

    $scope.onFileSelect = function(event) {
      var image = event.target.files[0];
      
      if (image.type !== 'image/png' && image.type !== 'image/jpeg') {
          alert('Only PNG and JPEG are accepted.');
          return;
      }

      $scope.upload = Upload.upload({
          url: API_URL + 'upload',
          method: 'POST',
          file: image
      }).success(function(data, status, headers, config) {
          $scope.img = data.url;
      }).error(function(err) {
          console.log('Error uploading file: ' + err.message || err);
      });
    };
  });
