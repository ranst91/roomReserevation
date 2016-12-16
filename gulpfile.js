'use strict';
//Some dependencies
var gulp = require('gulp');
var connect = require('gulp-connect'); //run a dev server
var open = require('gulp-open'); //open a url in a web browser
var babel = require('gulp-babel');
var concat = require('gulp-concat'); // Add files together
var rename = require('gulp-rename');
var sass = require('gulp-sass');

//A Config to point directories, port, the url of the web server w'ere about to use
var config = {
    port: 8080,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        views: './src/**/**.html',
        js: './src/**/*.js',
        vendor: 'bower_components/**/**.min.js',
        css: 'bower_components/**/**.css',
        sass: './src/**/*.scss',
        dist: './dist',
        mainJS: './src/app.js'
    }
};
//Start a server
gulp.task('connect', function () {
   connect.server({
       root: ['dist'],
       port: config.port,
       base: config.devBaseUrl,
       livereload: true
   });
});

//Open up a browser window
gulp.task('open', ['connect'], function () {
    gulp.src('dist/index.html')
        .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

//Load up the index.html file for the app
gulp.task('html', function () {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload())
});

//Load up the index.html file for the app
gulp.task('views', function () {
    gulp.src(config.paths.views)
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(config.paths.dist+'/views'))
        .pipe(connect.reload())
});

gulp.task('sass', function () {
   gulp.src(config.paths.sass)
       .pipe(sass())
       .pipe(concat('bundle.css'))
       .pipe(gulp.dest(config.paths.dist + '/css'))
       .pipe(connect.reload());
});

//Concat any css into 1 file called bundle.css
gulp.task('style_vendor', function () {
   gulp.src(config.paths.css)
       .pipe(concat('vendor.css'))
       .pipe(gulp.dest(config.paths.dist + '/css'))
});

gulp.task('vendor', function () {
    gulp.src(config.paths.vendor)
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
});

gulp.task('js', function () {
    gulp.src(config.paths.js)
        .pipe(babel({presets: ['es2015']}))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
});

//Watches the html and JS files for a change
gulp.task('watch', function () {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.views, ['views']);
    gulp.watch(config.paths.sass, ['sass']);
    gulp.watch(config.paths.js, ['js']);
});

/**
 * Running the task "gulp" will:
 * 1. create the html file in the dist directory
 * 2. Concat and compile js and css to include them in the html
 * 3. Check for any js errors throughout development
 * 4. Set up a local dev server, Open a web browser the get the stuff running
 * 5. Watch for any real time changes
 */
gulp.task('default', ['html', 'views', 'style_vendor', 'sass', 'vendor', 'js', 'open', 'watch']);