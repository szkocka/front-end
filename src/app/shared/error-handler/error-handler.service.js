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
                template: '<md-toast>' + this.message + 
                        '<md-button class="md-secondary md-icon-button" ng-click="close()">\
                            <md-icon aria-label="lose" class="delete">\
                                close\
                            </md-icon>\
                        </md-button>\
                    </md-toast>',
                hideDelay: 2000,
                controller  : 'ErrorController',
                position: 'bottom left'
            });
        }
    }
})();