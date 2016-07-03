'user strict';

define(['angular'], function(angular) {

    angular.module('researchApp.Services').factory('AppSettings', ['CacheStore', 'Type', 'Assert',
    function(CacheStore, Type, Assert) {

        /**
         * Current services is used for saving and working with application settings
         */
        function AppSettings() {
            /** @private {String} */
            this._settingsName = 'appSettings';
            /** @private {Object} */
            this._settings = null;

            /**
             * @private
             * @return {Object}
             */
            this._getSettingsData = function() {
                var settings = CacheStore.getItem(this._settingsName);

                if (Type.isString(settings)) {
                    return JSON.parse(settings);
                } else {
                    settings = window.CONFIGURATION.getOptions();
                    this.saveSettings(settings);
                    return settings;
                }
            };

            /**
             * @public
             * @param {Object} settings
             */
            this.saveSettings = function(settings) {
                Assert.isString(settings.API_URL, 'Invalid "API_URL" type');
                Assert.isNumber(settings.loadLimit, 'Invalid "loadLimit" type');

                this._settings = settings;
                CacheStore.cacheItem(this._settingsName, JSON.stringify(this._settings));
            };

            /**
             * @public
             * @return {String}
             */
            this.getAppServer = function() {
                return this._settings.API_URL;
            };

            /**
             * @public
             * @return {Number}
             */
            this.getLoadLimit = function() {
                return this._settings.loadLimit;
            };

            /**
             * @public
             * @return {Number}
             */
            this.getCarouselInterval = function() {
                return this._settings.carouselInterval;
            };

            /**
             * @public
             * @return {Number}
             */
            this.getTagsShortListQty = function() {
                return this._settings.tagsShortListQty;
            };

            /**
             * @public
             * @return {Object}
             */
            this.getAppSettings = function() {
                return this._settings;
            };

            this._settings = this._getSettingsData();
        }

        return new AppSettings();
    }]);
});