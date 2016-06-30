require.config({
    paths:{
        angular: "./../bower_components/angular/angular",
        ngCookies: './../bower_components/angular-cookies/angular-cookies',
        ngSanitize: "./../bower_components/angular-sanitize/angular-sanitize",
        uiRouter: "./../bower_components/angular-ui-router/release/angular-ui-router",
        ngResource: "./../bower_components/angular-resource/angular-resource",
        uiBootstrapTpls: "./../bower_components/angular-bootstrap/ui-bootstrap-tpls",
        moment: "./../bower_components/moment/moment",
        ngMoment: "./../bower_components/angular-moment/angular-moment",
        ngFileUpload: "./../bower_components/ng-file-upload/ng-file-upload",
        ngTagsInput: './../bower_components/ng-tags-input/ng-tags-input.min',
        lodash: './../bower_components/lodash/dist/lodash.compat',
        jquery: './../bower_components/jquery/dist/jquery',
        ngFileUploadShim: './../bower_components/ng-file-upload-shim/ng-file-upload-shim',
        kendo: './../libs/kendo/js/kendo.all.min',
        lazyScroll: './../libs/lazy-scroll/lazy-scroll',

        directives: "common/directives",
        modules: "modules",
        services: "common/services",
        account: "account",
        commonComponents: "common/components",
        utils: "common/utils",
        configuration : 'common/configuration/configuration'
    },
    shim: {
        'angular' : {'exports' : 'angular'},
        'ngCookies': ['angular'],
        'ngSanitize' : ['angular'],
        'uiRouter' : ['angular'],
        'ngResource' : ['angular'],
        'ngMoment': ['angular'],
        'ngFileUpload': ['angular'],
        'ngTagsInput': ['angular'],
        'ngFileUploadShim': ['angular'],
        'uiBootstrapTpls': ['angular'],
        'lazyScroll': ['angular']
    }
});

require(['init']);

//directives initialization should occure BEFORE angular bootstrap
require(['directives/carousel.directive']);
require(['directives/mathjaxBind.directive']);
require(['modules/add-update-project/customOnChangeDirective']);

require(['app'], function (app) {
  app.init();
});