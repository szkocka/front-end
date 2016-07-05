'use strict';
define(['angular'], function (angular) {
    angular.module('researchApp.Controllers').controller('AboutCtrl', 
        ['$scope', 'AboutService', 'Assert', 'Type', 'isAdmin',
        function ($scope, AboutService, Assert, Type, isAdmin) {
            /** @public {Boolean} */
            $scope.showEditButton = isAdmin;
            /** @public {Object} */
            $scope.aboutProject = {
                currentDescription: '',
                newDescription: ''
            };
            /** @public {String} */
            $scope.errorMsg = '';
            /** @public {String} */
            $scope.successMsg = '';
            /** @public {Boolean} */
            $scope.showEditableTexarea = false;
            

            /**
             * @private
             */
            $scope._init = function() {
                AboutService.getAboutInfo(function(err, res) {
                    if (Type.isNull(res)) {
                        $scope.errorMsg = 'Error: Page was not loaded';
                    } else {
                        $scope.aboutProject.currentDescription = res.data.content;
                        $scope.aboutProject.newDescription = res.data.content;
                    }
                });
            }


            /**
             * @public
             */
            $scope.updateAbout = function() {
                var params = {
                    content: $scope.aboutProject.newDescription
                };

                AboutService.updateAboutInfo(params, function(err, res) {
                    if (Type.isNull(res)) {
                        $scope.errorMsg = 'Error';
                    } else {
                        $scope.aboutProject.currentDescription = $scope.aboutProject.newDescription;
                        $scope.successMsg = 'Saved';
                    }
                    $scope.showEditableTexarea = false;
                });
            };

            /**
             * @public
             */
            $scope.edit = function() {
                  $scope.errorMsg = '';
                  $scope.successMsg = '';
                  $scope.showEditableTexarea = true;
            };

            /**
             * @public
             */
            $scope.cancel = function() {
                $scope.showEditableTexarea = false;
            };

            $scope._init();
    }]);
});