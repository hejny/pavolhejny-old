const gulp = require('gulp');
const gulpRename = require('gulp-rename');
const gulpSass = require('gulp-sass');
const gulpJade = require('gulp-jade');


gulp.task('default', ['build']);
gulp.task('build', ['build-html', 'build-css', 'build-js-production']);


gulp.task('build-html', function () {

    gulp.src('./src/templates/index.jade')
        .pipe(gulpJade({
            pretty: true
        }))
        .pipe(gulp.dest('./dist/'))
});


gulp.task('build-css', function () {
    const stream = gulp.src("./src/style/index.scss")
        .pipe(gulpSass())
        .pipe(gulpRename("./index.css"))
        .pipe(gulp.dest("./dist"))
    ;
    return stream
        ;
});


const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const path = require('path');
const uglifyJSPlugin = require('uglifyjs-webpack-plugin');


[/*'development', */'production'].forEach(function (environment) {
    gulp.task('build-js-' + environment, function () {
        return gulp.src('./src/*')
            .pipe(gulpWebpack({
                entry: {
                    first: './src/script/index.js'
                },
                output: {
                    filename: 'index' + (environment === 'production' ? '.min' : '') + ".js",
                    path: __dirname + "/dist",
                },
                target: 'web',
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
                    }, {
                        test: /\.json$/,
                        loader: 'json'
                    }
                    ],
                    resolve: {
                        extensions: ['', '.js', '.jsx']
                    }
                },
                plugins: environment === 'production' ? [
                    new webpack.DefinePlugin({
                        'process.env': {
                            NODE_ENV: JSON.stringify('production')
                        }
                    }),
                    new uglifyJSPlugin({
                        sourceMap: true
                    })
                ] : []
            }))
            .on('error', () => {
            })//todo maybe better
            .pipe(gulp.dest('./dist/'))
            ;
    });
});