define([
    'angular',
    'app',

    //========== SERVICES ===========//
    //'services/authInterceptor',
    'services/auth.service',
    'services/user.service',
    'services/news.service',
    'services/researches.service',
    'services/rest.service',

    //========== COMMON COMPONENTS ===========//
    'commonComponents/modal/modal.service',
    'commonComponents/navbar/navbar.controller',

    //========== ROUTERS ===========//
    'account/account',
    'modules/about/about',
    'modules/add-update-project/add-update-project',
    'modules/admin/admin',
    'modules/edit-profile/edit-profile',
    'modules/my-projects/my-projects',
    'modules/news/news',
    'modules/profile/profile',
    'modules/project/project',
    'modules/home/home',
    
], function() {});