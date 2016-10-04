module.exports = function() {
    return {
        sources: {
            index: 'src/index.html',
            scripts: 'src/app/**/*.js',
            stylesheets: [
                'node_modules/angular-material/angular-material.css',
                'src/assets/**/*.css',
                'src/app/app.css',
                'src/app/**/*.css'
            ],
            images: 'src/assets/images/**/*',
            fonts: [
                'node_modules/font-awesome/fonts/**/*'
                ],
            templates: 'src/app/**/*.html',
            vendors: [
                // Kendo UI requires jQuery to be included before AngularJS
                'node_modules/jquery/dist/jquery.js',
                'node_modules/angular/angular.js',
                'node_modules/angular-bootstrap/ui-bootstrap-tpls.js',
                'node_modules/angular-cookies/angular-cookies.js',
                'node_modules/moment/moment.js',
                'node_modules/angular-moment/angular-moment.js',
                'node_modules/angular-messages/angular-messages.js',
                'node_modules/angular-resource/angular-resource.js',
                'node_modules/angular-sanitize/angular-sanitize.js',
                'node_modules/angular-aria/angular-aria.js',
                'node_modules/angular-animate/angular-animate.js',
                'node_modules/angular-material/angular-material.js',
                'node_modules/angular-ui-router/release/angular-ui-router.js',
                'node_modules/lodash/dist/lodash.min.js',
                'node_modules/ng-file-upload/dist/ng-file-upload-shim.js',
                'node_modules/ng-file-upload/dist/ng-file-upload.min.js',
                'node_modules/ng-infinite-scroll/build/ng-infinite-scroll.min.js',
                'src/assets/lib/**/*.js'
            ],
            kendoSprite: 'src/assets/lib/kendo/css/Default/**/*.png'
        },
        dev: {
            index: 'dev',
            scripts: 'dev/app',
            less: 'dev/less',
            stylesheets: 'dev/stylesheets',
            images: 'dev/img',
            fonts: 'dev/fonts',
            templates: 'dev/app',
            vendors: 'dev/vendor',
            kendoSprite: 'dev/stylesheets/Default'
        },
        release: {
            index: 'release',
            scripts: 'release/js',
            stylesheets: 'release/css',
            images: 'release/img',
            fonts: 'release/fonts',
            templates: 'release/layout',
            vendors: 'release/vendor',
            kendoSprite: 'release/css/Default'
        }
    };
};