var config = require('./gulp.config')();

var gulp = require('gulp'),
    angularFileSort = require('gulp-angular-filesort'),
    concat = require('gulp-concat'),
    inject = require('gulp-inject'),
    ngAnnotate = require('gulp-ng-annotate'),
    ngHtml2js = require('gulp-ng-html2js'),
    del = require('del'),
    eventStream = require('event-stream'),
    environments = require('gulp-environments'),
    watch = require('gulp-watch');

var development = environments.development;
var production = environments.production;
//environments.current(production);

var destination = environments.production() ? config.release : config.dev;

gulp.task('clean', clean);
gulp.task('compile', compile);
gulp.task('build', ['clean'], compile);

gulp.task('default', ['build']);

gulp.task('watch', function() {
    gulp.watch(config.sources.scripts, buildScripts);
    gulp.watch(config.sources.templates, buildTemplates);
    gulp.watch(config.sources.stylesheets, buildStyles);
});

function clean() {
    return del(destination.index);
}

function compile() {
    return eventStream.merge(
        buildIndex(),
        buildImages(),
        buildFonts(),
        buildKendoSprite()
    );
}

function buildIndex() {
    return gulp.src(config.sources.index)
        .pipe(inject(buildVendorScripts(), { ignorePath:destination.index, addRootSlash:false, name: 'vendor'}))
        .pipe(inject(buildScripts(), { ignorePath:destination.index, addRootSlash:false }))
        .pipe(inject(buildTemplates(), { ignorePath:destination.index, addRootSlash:false, name: 'templates' }))
        .pipe(inject(buildStyles(), { ignorePath:destination.index, addRootSlash:false}))
        .pipe(gulp.dest(destination.index));
}

function buildImages() {
    return gulp.src(config.sources.images)
        .pipe(gulp.dest(destination.images));
}

function buildFonts() {
    return gulp.src(config.sources.fonts)
        .pipe(gulp.dest(destination.fonts));
}

function buildScripts() {
    return gulp.src(config.sources.scripts)
        .pipe(angularFileSort())
        .pipe(ngAnnotate())
        .pipe(environments.production(concat('build.js')))
        .pipe(gulp.dest(destination.scripts));
}

function buildTemplates() {
    return gulp.src(config.sources.templates)
        .pipe(ngHtml2js({moduleName: 'templates'}))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(destination.templates));
}

function buildVendorScripts() {
    return gulp.src(config.sources.vendors)
        .pipe(environments.production(concat('vendor.js')))
        .pipe(gulp.dest(destination.vendors));
}

function buildStyles() {
    return gulp.src(config.sources.stylesheets)
        .pipe(concat('app.css'))
        .pipe(gulp.dest(destination.stylesheets));
}

function buildKendoSprite() {
    return gulp.src(config.sources.kendoSprite)
        .pipe(gulp.dest(destination.kendoSprite));
}
