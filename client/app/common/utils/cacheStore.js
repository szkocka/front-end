define(['angular'], function(angular) {

	angular.module('researchApp.Utils').factory('CacheStore', function() {

        var cacheStore = {};

        /**
         * @public
         * @param {String} key
         * @param {*} value
         */
        cacheStore.cacheItem = function(key, value) {
            window.localStorage[key] = JSON.stringify(value);
        };

        /**
         * @public
         * @param {String} key
         * @return {*}
         */
        cacheStore.getItem = function(key) {
            if (this.itemExist(key)) {
                return JSON.parse(window.localStorage[key]);
            }
            return null;
        };

        /**
         * @public
         * @param {String} key
         * @return {Boolean}
         */
        cacheStore.itemExist = function(key) {
            return (window.localStorage[key] !== undefined);
        };

        /**
         * @public
         * @param {String} key
         */
        cacheStore.removeItem = function(key) {
            window.localStorage.removeItem(key);
        };

        /**
         * @public
         */
        cacheStore.clear = function() {
            window.localStorage.clear();
        };

        /**
         * @public
         * @param {Function<String, *>} callback
         */
        cacheStore.forEach = function(callback) {
            var resultingArray = [];
            var length = window.localStorage.length;
            for (var i = 0; i < length; i++) {
                var key = window.localStorage.key(i);
                var value = window.localStorage.getItem(key);

                resultingArray.push({key: key, value: value});
            }

            resultingArray.forEach(function(item) {
                callback(item.key, item.value);
            });
        };

        return cacheStore;
    });
});