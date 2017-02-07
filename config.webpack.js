/*

*/
'use strict';

var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// Common config
var commonConfig = {
    NODE_ENV:'dev',
    port:3000,
    publicPath: '/public/',
    distPath:path.resolve(process.cwd()) + '/dist/',
    srcPath:'/src/',
    docRoot: path.resolve(process.cwd()) + '/',
    webpackServerHost: 'localhost',
//    cdnPath:'http://cardev.qunar.com/h5/static/js/',
    cdnPath:'http://localhost/h5/static/js/',
    localPublicPath:'',
    domain : 'http://localhost/'
};
// Webpack config
var webpackServerUrl = 'http://' + commonConfig.webpackServerHost + ':' + commonConfig.port;
commonConfig.localPublicPath = webpackServerUrl + commonConfig.publicPath ;

// Auto intergrate entry files.
var entryFiles = fs.readdirSync(path.join(commonConfig.docRoot,'entry'));
var entryFileObj = {};

entryFiles.forEach(function(file) {
    console.log('file name:', file);
    // var filename = file.split('.')[0];
    entryFileObj[file] = [
        path.join( commonConfig.docRoot,'entry',file)
    ];
});

console.log(entryFileObj);

var webpackConfig = {

    entry:entryFileObj,
    output: {
        path: path.join( commonConfig.docRoot ,commonConfig.distPath ,'static'),
        publicPath: webpackServerUrl + '/public',
        filename: "[name].bundle.js"
    },
    resolve:{
        extensions:['','.js','.css','.less']
    },
    module: {
        loaders: [
            {
                test: /\.css?$/,
                loader: "style!css"
            },
            {
                test: /\.less?$/,
                loader: ExtractTextPlugin.extract('style', 'css!less')
            },
            {
                test:/\.(jpg|png)$/,
                loader:"url?limit=8192"
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query:{
                    presets:["es2015"]
                }
            }
        ]
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false
            },
            mangle:{
                except:['$','exports','require','Zepto','doT']
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new ExtractTextPlugin("[name].bundle.css")
    ]

};

module.exports = {
    commonConfig:commonConfig,
    webpackConfig:webpackConfig
};
