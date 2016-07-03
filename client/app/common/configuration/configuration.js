'use strict';

define([], function() {
    /** @private {Object} */
    var baseConfiguration = {
        'API_URL': 'https://szkocka-1080.appspot.com/',
        'loadLimit': 20,
        'tagsShortListQty': 15,
        'carouselInterval': 5000,
        'appVersion': '1.0'
    };

    /** @public {Object} */
    window.CONFIGURATION = {
        /**
         * @public
         * @return {Object}
         */
        getOptions: function() {
            return baseConfiguration;
        }
    };
});