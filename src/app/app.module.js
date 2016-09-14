angular
    .module('app', [
        //inject here angular modules
        'ngCookies',
        'ui.router',
        'ngMessages',
        'ngSanitize',
        'ngFileUpload',
        'ngTagsInput',
        'angularMoment',
        'ui.bootstrap',
        'ngMaterial',

        'kendo.directives',
        'lazy-scroll',
        //'mock',

        'auth',
        'layouts',
        'shared',

        //inject here your components
        'about',
        'account',
        'admin',
        'home',
        'news',
        'profile',
        'projects',

        'templates'
    ]);