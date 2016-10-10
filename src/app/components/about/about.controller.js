;(function() {
    'use strict';

    angular
        .module('about')
        .controller('AboutController', AboutController);

    /* ngInject */
    function AboutController($scope, aboutService, accountService, AboutContentResolver) {
        $scope.showEditButton = accountService.isAdmin();
        $scope.description = AboutContentResolver.data.content;
        $scope.data = {
            editedDescription: $scope.description
        };
        $scope.showEditableTexarea = false;

        $scope.save = save;
        $scope.edit = edit;
        $scope.cancel = cancel;

        function save(e) {
            e.preventDefault();
            aboutService.update({
                    content: $scope.data.editedDescription
                }).then(function(response){
                        $scope.description = $scope.data.editedDescription;
                        $scope.showEditableTexarea = false;
                        //TODO: Show success message in some dialog window or toast
                        console.log('Saved...');
                    }, function(error){
                        console.log(error.message);
                    });
        }

        function edit() {
              $scope.showEditableTexarea = true;
        }

        function cancel() {
            $scope.showEditableTexarea = false;
        }
    }
})();