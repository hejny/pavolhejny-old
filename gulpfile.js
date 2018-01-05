


var gulp = require('gulp');
var rename = require('gulp-rename');


var sass = require('gulp-sass');
var jade = require('gulp-jade');
var runSequence = require('run-sequence');
var fs = require("fs");
var url = require("url");



gulp.task('default',['build']);
gulp.task('build', ['build-js-browser-production','build-js-server-development','build-css']);



gulp.task('build-html', function() {
    var YOUR_LOCALS = {};

    gulp.src('./src/templates/*.jade')
        .pipe(jade({
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest('./dist/'))
});




gulp.task('build-css', function() {

    var stream = gulp.src("./src/style/index.scss")
        .pipe(sass())
        .pipe(rename("./personal-web.css"))
        .pipe(gulp.dest("./dist"))
        ;


    if(browserSync) {
        stream.pipe(browserSync.stream());
    }

    return stream

    ;
});















/*
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');




/*
['development','production'].forEach(function(environment){





    gulp.task('build-js-'+environment, function() {



        return gulp.src('./src/*')
            .pipe(gulpWebpack({


                entry: {
                    first: './src/script/index.js'
                },
                output: {
                    filename: target+(environment==='production'?'.min':'')+".js",
                    path: __dirname + "/dist",
                },


                target: target==='browser'?'web':'node',
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



                plugins:environment==='production'?[
                    new webpack.DefinePlugin({
                        'process.env': {
                            NODE_ENV: JSON.stringify('production')
                        }
                    }),


                    new UglifyJSPlugin({
                        sourceMap: true
                    })
                ]:[]






            }))
            .on('error', ()=>{})//todo maybe better
            .pipe(gulp.dest('./dist/'))
        ;
    });


});
*/