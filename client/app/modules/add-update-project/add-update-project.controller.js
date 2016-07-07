'use strict';
define(['angular'], function (angular) {
    angular.module('researchApp.Controllers').controller('AddUpdateProjectCtrl',
        ['$scope', 'Upload', '$state', '$stateParams', 'Assert', 'Type', 'AppSettings', 'ResearchesService', 'ForumsService',
        function ($scope, Upload, $state, $stateParams, Assert, Type, AppSettings, ResearchesService, ForumsService) {
            /** @private {String} */
            $scope.projectId = $stateParams.id;
            /** @private {String} */
            $scope.API_URL = AppSettings.getAppServer();
            /** @public {Boolean} */
            $scope.newProject = true;
            /** @public {Object} */
            $scope.project = {
                description: {}
            };
            /** @public {Array<Object>} */
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
            /** @public {Array<String>} */
            $scope.errors = {
                titleError: null,
                shortDescError: null,
                longDescError: null,
                tagsError: null,
                errorMsg: null
            };

            /**
             * @private
             */
            $scope._init = function() {
                if($scope.projectId === 'null') {
                    return;
                } else {
                    $scope.newProject = false;

                    ResearchesService.getResearchById($scope.projectId, function(err, res){
                        if (Type.isNull(res)) {
                            $scope.errors.errorMsg = 'Failed to load the project';
                        } else {
                            $scope.project = res.data;
                        }
                    });
                }
            };

            /**
             * @public
             */
            $scope.addProject = function() {
                if(!_projectIsValid()) {
                    return;
                }

                var params = {
                    title: $scope.project.title,
                    tags: _.map($scope.project.tags, function(t){return t.text}),
                    image_url: $scope.project.image_url,
                    area: 'test area',
                    description: {
                        brief: $scope.project.description.brief,
                        //detailed: $scope.project.description.detailed
                        detailed: 'New Arch'
                    }
                };

                ResearchesService.createNewResearch(params, function(err, res){
                    if (Type.isNull(res)) {
                        $scope.errors.errorMsg = 'Project was not created';
                    } else {
                        $scope.project = {};

                        $scope._createForum(res.data.research_id.toString());
                    }
                });
            };

            /**
             * @private
             * @param {String} id
             */
            $scope._createForum = function(id){
                Assert.isString(id, 'Invalid "id" type');

                var params = {
                    researchId: id,
                    subject: 'Default forum'
                };

                ForumsService.createNewForum(params, function(err, res) {
                    if (Type.isNull(res)) {
                        $scope.errors.errorMsg = 'Failed to create new forum';
                    } else {
                        $state.go('project.about', {id: id});
                    }
                });
            };

            /**
             * @public
             */
            $scope.updateProject = function() {
                if(!_projectIsValid()) {
                    return;
                }

                var params = {
                    researchId: $scope.projectId,
                    title: $scope.project.title,
                    image_url: $scope.project.image_url,
                    status: $scope.project.status,
                    description: {
                        brief: $scope.project.description.brief,
                        detailed: $scope.project.description.detailed
                    }
                };

                ResearchesService.updateResearch(params, function(err, res){
                    if (Type.isNull(res)) {
                        $scope.errors.errorMsg = 'Error: Project was not updated';
                    } else {
                        $state.go('project.about', {id: $scope.projectId});
                    }
                });
            };

            /**
             * @public
             * @param {Object} researcher
             */
            $scope.removeResearcher = function(researcher) {
                var params = {
                    researchId: $scope.projectId,
                    researcherId: researcher.id
                };

                ResearchesService.removeResearcher(params, function(err, res){
                    if (Type.isNull(res)) {
                        $scope.errors.errorMsg = 'Error: Researcher was not deleted';
                    } else {
                        for (var i = 0; i < $scope.project.researchers.length; i++) {
                            if ($scope.project.researchers[i].id == researcher.id) {
                                $scope.project.researchers.splice(i, 1);
                            }
                        };
                    }
                });
            };

            /**
             * @public
             * @param {Object} event
             */
            $scope.onFileSelect = function(event) {
                Assert.isObject(event, 'Invalid "event" type');

                var image = event.target.files[0];
                
                if (image.type !== 'image/png' && image.type !== 'image/jpeg') {
                    alert('Only PNG and JPEG are accepted.');
                    return;
                }

                $scope.upload = Upload.upload({
                    url: $scope.API_URL + 'upload',
                    method: 'POST',
                    file: image
                }).success(function(data, status, headers, config) {
                    $scope.project.image_url = data.url;
                }).error(function(err) {
                    $scope.errors.errorMsg = 'Error: File was not uploaded';
                });
            };


            function _projectIsValid() {
                if (!Type.isString($scope.project.title) || $scope.project.title === '') {
                     $scope.errors.titleError = 'Title is required.';
                } else {
                    $scope.errors.titleError = null;
                }
                if (!Type.isString($scope.project.description.brief) || $scope.project.description.brief === '') {
                    $scope.errors.shortDescError = 'Short Description is required.'
                } else {
                    $scope.errors.shortDescError = null;
                }
                /*if (!Type.isString($scope.project.description.detailed) || $scope.project.description.detailed  === '') {
                    $scope.errors.longDescError = 'Detailed Description is required.'
                } else {
                    $scope.errors.longDescError = null;
                }*/
                if (!Type.isArray($scope.project.tags) || $scope.project.tags.length === 0) {
                    $scope.errors.tagsError = 'Required.';
                } else {
                    $scope.errors.tagsError = null;
                }
                if (!Type.isString($scope.project.title) || $scope.project.title === '' || 
                    !Type.isString($scope.project.description.brief) || $scope.project.description.brief === '' ||
                    //!Type.isString($scope.project.description.detailed) || $scope.project.description.detailed === '' || 
                    !Type.isArray($scope.project.tags) || $scope.project.tags.length === 0) {
                    return false;
                } else {
                    return true;
                }
            }

            $scope._init();
    }]);
});
