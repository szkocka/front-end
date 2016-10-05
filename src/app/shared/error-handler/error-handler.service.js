;(function() {
    'use strict';

    angular
        .module('error-handler')
        .factory('errorService', errorService);

    function errorService($mdToast) {
        var service = {
            message: '',
            showError: showError
        };
        return service;
        function showError( errorMessage ) {
            this.message = errorMessage;
            $mdToast.show( {
                template: '<md-toast>' + this.message + '</md-toast>',
                hideDelay: 3000,
                position: 'bottom left'
            });
        }
    }
})();