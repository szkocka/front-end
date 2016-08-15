;(function() {
    'use strict';

    angular
        .module('news.add')
        .config(config);

    /* ngInject */
    function config($stateProvider) {
        $stateProvider.state('news-add', {
            url: '^/news-add',
            parent: 'restricted-area',
            views: {
                content: {
                    templateUrl: 'components/news/add/add.html',
                    controller: 'NewsAddController'
                }
            }
        });
    }
})();