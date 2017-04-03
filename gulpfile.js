


var gulp = require('gulp');
var rename = require('gulp-rename');

var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var fs = require("fs");
var url = require("url");



gulp.task('default',['build']);




gulp.task('build', ['build-js','build-css']);




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







//var babel = require("gulp-babel");
//var webpack = require('gulp-webpack');
const webpack = require('webpack-stream');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');


gulp.task('build-js', function() {




    return gulp.src('./src/*')
        .pipe(webpack({


            entry: {
                todotable: "./src/script/index.jsx"
            },
            output: {
                filename: "personal-web.js",
                path: __dirname + "/dist",
                libraryTarget: 'var',
                library: 'PersonalWeb'
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
                }],
                resolve: {
                    extensions: ['', '.js', '.jsx']
                }
            },


            plugins:[
                new UglifyJSPlugin({
                    sourceMap: true
                })
            ]






            /*entry: {
                todotable: "./src/script/index.jsx"
            },
            output: {
                filename: "personal-web.js",
                path: __dirname + "/dist",
                libraryTarget: 'var',
                library: 'PersonalWeb'
            },



            /*devtool: "source-map",



            resolve: {
                extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx", '.json', 'index.json']
            },




            module: {

                loaders: [
                    {
                        test: /\.js$/,
                        loader: 'babel'
                    },
                    {
                        test: /\.json$/,
                        loader: "json-loader"
                    }
                ],


                preLoaders: [
                    {
                        test: /\.js$/,
                        loader: "source-map-loader"
                    },
                ]
            },


            externals: {
                "react": "React",
                "react-dom": "ReactDOM"
            }*/




        }))
        .pipe(gulp.dest('./dist/'));
});














