


var gulp = require('gulp');
var rename = require('gulp-rename');

var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var fs = require("fs");
var url = require("url");



gulp.task('default',['build']);




gulp.task('build', ['build-js-min','build-css']);




gulp.task('browser-sync', function() {

    runSequence(
        'browser-sync-init'
        ,'build-css'
        ,'browser-sync-build-js'
        ,'browser-sync-watch');

});


gulp.task('browser-sync-init', function (done) {

    browserSync.init({
        server: {
            baseDir: "./",
            middleware: function(req, res, next) {
                var fileName = url.parse(req.url);
                fileName = fileName.href.split(fileName.search).join("");


                //if(fileName.substr(0,4)=='/api'){}


                var fileExists = fs.existsSync('./' + fileName);
                if (!fileExists && fileName.indexOf("browser-sync-client") < 0) {
                    req.url = "/index.html";
                }
                return next();
            }
        },
        open: false
    });
    done();

});
gulp.task('browser-sync-watch', function (done) {
    gulp.watch("./src/script/**/*.js",  ['browser-sync-build-js']);
    gulp.watch("./src/script/**/*.jsx", ['browser-sync-build-js']);
    gulp.watch("./src/style/**/*.scss", ['build-css']);
    gulp.watch("./*.html").on('change', browserSync.reload);
    done();
});


gulp.task('browser-sync-build-js', ['build-js'], function (done) {
    browserSync.reload();
    done();
});






gulp.task('build-css', function() {
    return gulp.src("./src/style/index.scss")
        .pipe(sass())
        .pipe(rename("./personal-web.css"))
        .pipe(gulp.dest("./dist"))
        .pipe(browserSync.stream());
});







const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const path = require('path');


gulp.task('build-js', function() {




    return gulp.src('./src/*')
        .pipe(gulpWebpack({


            entry: {
                browser: "./src/script/browser.jsx",
                server: "./src/script/server.jsx"
            },
            output: {
                filename: "[name].js",
                path: __dirname + "/dist",
                //libraryTarget: 'var',
                //library: 'PersonalWeb'
            },

            devtool: "source-map",

            module: {
                loaders: [{
                    test: /\.jsx?$/,
                    loaders: ['babel?presets[]=es2015&presets[]=react'],
                    include: [
                        path.resolve(__dirname, "./src/script"),
                    ],
                    exclude: [
                        path.resolve(__dirname, "node_modules"),
                    ]
                },{
                    test: /\.json$/,
                    loader: 'json'
                }
                ],
                resolve: {
                    extensions: ['', '.js', '.jsx']
                }
            }

        }))
        .pipe(gulp.dest('./dist/'));
});






const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


gulp.task('build-js-min', function() {




    return gulp.src('./src/*')
        .pipe(gulpWebpack({


            entry: {
                browser: "./src/script/browser.jsx"
            },
            output: {
                filename: "[name].min.js",
                path: __dirname + "/dist",
                //libraryTarget: 'var',
                //library: 'PersonalWeb'
            },

            devtool: "source-map",

            module: {
                loaders: [{
                    test: /\.jsx?$/,
                    loaders: ['babel?presets[]=es2015&presets[]=react'],
                    include: [
                        path.resolve(__dirname, "./src/script"),
                    ],
                    exclude: [
                        path.resolve(__dirname, "node_modules"),
                    ]
                },{
                    test: /\.json$/,
                    loader: 'json'
                }
                ],
                resolve: {
                    extensions: ['', '.js', '.jsx']
                }
            },




            plugins:[
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV: JSON.stringify('production')
                    }
                }),


                new UglifyJSPlugin({
                    sourceMap: true
                })/*,
                 require('rollup-plugin-replace')({
                 'process.env.NODE_ENV': JSON.stringify('production')
                 }),
                 require('rollup-plugin-commonjs')()*/
            ]

        }))
        .pipe(gulp.dest('./dist/'));
});










