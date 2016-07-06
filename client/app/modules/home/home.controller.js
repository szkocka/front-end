'use strict';
define(['angular'], function (angular) {
    angular.module('researchApp.Controllers').controller('HomeCtrl',
        ['$scope', '$rootScope', 'ResearchesService', 'Assert', 'Type', 'AppSettings',
        function ($scope, $rootScope, ResearchesService, Assert, Type, AppSettings) {

            /** @private {Object} */
            $scope.appSettings = AppSettings.getAppSettings();

            /** @public {Array<Object>} */
            $scope.latest5 = [];
            /** @public {Array<Object>} */
            $scope.projectsList = [];
            /** @private {Array<Object>} */
            $scope.tags = [];
            /** @public {Array<Object>} */
            $scope.viewTags = [];
            /** @public {Boolean} */
            $scope.showTagsShortList = true;
            /** @public {Boolean} */
            $scope.loadMoreAvailable = true;
            /** @private {String} */
            $scope.filterEventName = 'projectsFilter';
            /** @private {Object} */
            $scope.searchParams = {
                keyword: null,
                status: 'active',
                tag: null,
                page: 0
            };

            /** @public {String} */
            $scope.errorMsg = '';

            /**
             * @private
             */
            $scope._getTags = function () {
                ResearchesService.getTags(function(err, res) {
                    if (!Type.isNull(res)) {
                        $scope.tags = _.uniq(res.data.tags);

                        if ($scope.tags.length > $scope.appSettings.tagsShortListQty) {
                          $scope._getTagsToShow();
                        } else {
                          $scope.viewTags = $scope.tags;
                        }
                    }
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
             * @private
             */
            $scope._init = function() {

                ResearchesService.queryResearches($scope.searchParams, function(err, res) {
                    if (Type.isNull(res)) {
                        $scope.errorMsg = err.message;
                        $scope.loadMoreAvailable = false;
                    } else {
                        if(_.find($scope.projectsList, function(proj) {
                            return proj.id == res.data.researches[0].id; })
                            ) {
                            return;
                        }
                        if (res.data.researches.length < $scope.appSettings.loadLimit) {
                            $scope.loadMoreAvailable = false;
                        }

                        res.data.researches.forEach(function(proj){
                            $scope.projectsList.push(proj);
                        });

                        $scope.latest5 = _.first($scope.projectsList, 5);
                        $scope.searchParams.page = $scope.searchParams.page + 1;
                        
                        // fire event to redraw main image slider carousel
                        $rootScope.$broadcast($scope.filterEventName);
                    }
                });
            };

            /**
             * @public
             */
            $scope.showActiveProjects = function() {
                $scope.projectsList = [];
                $scope.searchParams.page = 0;
                $scope.searchParams.keyword = null;
                $scope.searchParams.status = 'active';
                $scope.loadMoreAvailable = true;
                $scope._init();
            };

            /**
             * @public
             */
            $scope.showAllProjects = function() {
                $scope.projectsList = [];
                $scope.searchParams.page = 0;
                $scope.searchParams.keyword = null;
                $scope.searchParams.status = null;
                $scope.loadMoreAvailable = true;
                $scope._init();
            };

            /**
             * @public
             */
            $scope.search = function() {
                $scope.projectsList = [];
                $scope.searchParams.page = 0;
                $scope.searchParams.tag = null;
                $scope.loadMoreAvailable = true;
                $scope._init();
            };

            /**
             * @public
             */
            $scope.clearTag = function() {
                $scope.projectsList = [];
                $scope.searchParams.page = 0;
                $scope.searchParams.keyword = null;
                $scope.searchParams.tag = null;
                $scope.loadMoreAvailable = true;
                $scope._init();
            };

            /**
             * @public
             * @param {String} tag
             */
            $scope.activateTag = function(tag) {
                $scope.projectsList = [];
                $scope.searchParams.page = 0;
                $scope.searchParams.keyword = null;
                $scope.searchParams.tag = tag;
                $scope.loadMoreAvailable = true;
                $scope._init();
            };

            /**
             * @public
             */
            $scope.showAllTags = function () {
                $scope.viewTags = $scope.tags;
                $scope.showTagsShortList = false;
            };

            /**
             * @public
             */
            $scope.showLessTags = function () {
                $scope._getTagsToShow();
                $scope.showTagsShortList = true;
            };

            /**
             * @public
             */
            $scope._getTagsToShow = function() {
                $scope.viewTags = [];

                for (var i = 0; i < $scope.appSettings.tagsShortListQty; i++) {
                    $scope.viewTags.push($scope.tags[i]);
                };
            }
            $scope._init();
            $scope._getTags();
    }]);
});