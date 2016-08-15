;(function() {
    'use strict';

    angular
        .module('utils')
        .factory('CacheStore', cacheStoreService);

    /* ngInject */
    function cacheStoreService($window) {

        return {
            /**
             * @public
             * @param {String} key
             * @param {*} value
             */
            cacheItem: function(key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },

            /**
             * @public
             * @param {String} key
             * @return {*}
             */
            getItem: function(key) {
                if (this.itemExist(key)) {
                    return JSON.parse($window.localStorage[key]);
                }
                return null;
            },

            /**
             * @public
             * @param {String} key
             * @return {Boolean}
             */
            itemExist: function(key) {
                return ($window.localStorage[key] !== undefined);
            },

            /**
             * @public
             * @param {String} key
             */
            removeItem: function(key) {
                $window.localStorage.removeItem(key);
            },

            /**
             * @public
             */
            clear: function() {
                $window.localStorage.clear();
            },

            /**
             * @public
             * @param {Function<String, *>} callback
             */
            forEach: function(callback) {
                var resultingArray = [];
                var length = $window.localStorage.length;
                for (var i = 0; i < length; i++) {
                    var key = $window.localStorage.key(i);
                    var value = $window.localStorage.getItem(key);

                    resultingArray.push({key: key, value: value});
                }

                resultingArray.forEach(function(item) {
                    callback(item.key, item.value);
                });
            }
        };
    }
})();