const gulp = require('gulp');
const GulpRename = require('gulp-rename');
const GulpSass = require('gulp-sass');
const GulpJade = require('gulp-jade');

gulp.task('default', ['build']);
gulp.task('build', ['build-html', 'build-css', 'build-js','copy-images']);


gulp.task('build-html', () => {
    return gulp.src('./src/templates/index.jade')
        .pipe(GulpJade({pretty: true}))
        .pipe(gulp.dest('./dist/'))
});


gulp.task('build-css', () => {
    return gulp.src("./src/style/index.scss")
        .pipe(GulpSass())
        .pipe(GulpRename("./index.css"))
        .pipe(gulp.dest("./dist"));
});


gulp.task('copy-images', () => {
    return gulp.src('src/images/*/**', { base: 'src' })
        .pipe(gulp.dest("./dist"));
});


const Webpack = require('webpack');
const GulpWebpack = require('webpack-stream');
const Path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


gulp.task('build-js', () => {
    return gulp.src('./src/*')
        .pipe(GulpWebpack({
            entry: {
                first: './src/script/index.js'
            },
            output: {
                filename: 'index.js',
                path: __dirname + "/dist",
            },
            target: 'web',
            devtool: "source-map",
            module: {
                loaders: [{
                    test: /\.jsx?$/,
                    loaders: ['babel?presets[]=es2015&presets[]=react'],
                    include: [
                        Path.resolve(__dirname, "./src/script"),
                    ],
                    exclude: [
                        Path.resolve(__dirname, "node_modules"),
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
            plugins: [
                new Webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV: JSON.stringify('production')
                    }
                }),
                new UglifyJSPlugin({
                    sourceMap: true
                })
            ]
        }))
        .on('error', () => {
        })//todo maybe better
        .pipe(gulp.dest('./dist/'))
        ;
});


///--------------------------------------------------------

const GulpRunSequence = require('run-sequence');
const BrowserSync = require('browser-sync');//todo use cases for modules

gulp.task('develop', ['build', 'browser-sync']);
gulp.task('browser-sync', () => {
    const browserSync = BrowserSync.create();
    browserSync.init({
        server: {
            baseDir: "./dist",
        },
        open: false
    });
    gulp.watch("./src/**/*", ['build', () => {
        browserSync.reload();
    }]);
    //todo css reloading without reloading page
});