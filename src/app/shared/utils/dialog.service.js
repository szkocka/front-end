;(function() {
    'use strict';

    angular
        .module('utils')
        .factory('dialogService', dialogService);

    /* ngInject */
    function dialogService($mdDialog, Assert) {

        return {
            /**
             * @public
             * @param {String} title
             * @param {String} msg
             * @param {String} btn
             * @param {Function} callback
             * @param {Object} ev
             * @param {Object} objToPass
             */
            confirm: function(title, msg, btn, callback, ev, objToPass) {
                Assert.isString(title, 'Invalid "title" type');
                Assert.isString(btn, 'Invalid "btn" type');
                Assert.isFunction(callback, 'Invalid "callback" type');
                Assert.isObject(ev, 'Invalid "ev" type');
                Assert.isObject(objToPass, 'Invalid "objToPass" type');

                var confirm = $mdDialog.confirm()
                    .title(title)
                    .textContent(msg)
                    .targetEvent(ev)
                    .ok(btn)
                    .cancel('CANCEL');

                $mdDialog.show(confirm).then(function() {
                    callback(objToPass);
                }, function() {});
            }
        };
    }
})();