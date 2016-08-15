;(function() {
    'use strict';

    angular
        .module('news')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('news', {
            url: '^/news',
            parent: 'restricted-area',
            views: {
                content: {
                    templateUrl: 'components/news/news.html',
                    controller: 'NewsController'
                }
            }
        });
    }
})();