 /* bootstraps angular onto the window.document node
 * NOTE: the ng-app attribute should not be on the index.html when using ng.bootstrap
 */
define([
    'angular',
    'services/auth.service',
    'services/authInterceptor',
    'services/news.service',
    'services/researches.service',
    'services/rest.service',
    'services/user.service',

    //========== ACCOUNT ===========//
    'account/account',
    'account/login/login.controller',
    'account/settings/settings.controller',
    'account/signup/signup.controller',

    //========== COMPONENTS ===========//
    'commonComponents/modal/modal.service',
    'commonComponents/navbar/navbar.controller',

    //========== HOME ===========//
    'modules/home/home',
], function() {});