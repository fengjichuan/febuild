'use strict';

var gulp = require('gulp');
var webpack = require('webpack');
var gulpWebpack = require('gulp-webpack');
var path = require('path');
var WebpackDevServer = require("webpack-dev-server");
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var runSequence = require('run-sequence');
var exec = require('child_process').exec;
var replace = require('gulp-replace');

var CONF = require('./config.webpack.js');
var webpackConfig = CONF.webpackConfig;
var webpackCompiler = webpack(webpackConfig);

gulp.task('publish-clean', function() {
    exec('rm -rf dist', function(err, out) {
        // console.log(out);
        // err && console.log(err);
    });
});

gulp.task('pack', ['publish-clean'], function() {
    // var webpackCompiler = webpack(CONF.webpackConfig);
    return gulp.src(['./entry/*'])
    .pipe(gulpWebpack(webpackConfig))
    // .pipe(replace('/h5/src/','/h5/'))
    .pipe(rev())
    .pipe(gulp.dest( CONF.commonConfig.distPath + 'static'))
    .pipe(rev.manifest())
    .pipe(gulp.dest( CONF.commonConfig.distPath));
});

/**
 * The gulp task during development.
 **/
gulp.task('dev',['webpack-dev-server'], function() {
    
});


var webpackServer;
gulp.task('webpack-dev-server', function() {

    console.log(CONF.commonConfig.docRoot, webpackConfig.output.publicPath);

    webpackServer = new WebpackDevServer(webpackCompiler, {
        contentBase: CONF.commonConfig.docRoot,
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true
        },
        hot: true
    });

    webpackServer.listen(CONF.commonConfig.port, CONF.commonConfig.webpackServerHost, function(err) {
        err && console.log(err);
    });

});

gulp.task('publish-html', function() {

    var dirReplacementsConfig = {};
    Object.defineProperty(dirReplacementsConfig,'http://localhost:3000/public/',{
        value:'/dist/static/',//CONF.commonConfig.cdnPath,
        writable:true,
        configurable:true,
        enumerable:true
    });

    return gulp.src([ CONF.commonConfig.distPath + 'rev-manifest.json','./**/*.html'])
    .pipe(revCollector({
        dirReplacements:dirReplacementsConfig
    }))
    .pipe(gulp.dest(CONF.commonConfig.distPath));
});

