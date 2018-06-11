const gulp = require('gulp');
const gulpRename = require('gulp-rename');
const gulpSass = require('gulp-sass');
const gulpJade = require('gulp-jade');
const gulpClean = require('gulp-clean');
const gulpSequence = require('gulp-sequence');
const eventStream = require('event-stream');
const getContent = require('./getContent');

gulp.task('default', ['build']);

gulp.task('build', function(callback) {
    return gulpSequence('build-cleanup', [
        'build-html',
        'build-css',
        'build-js',
        'copy-images',
    ])(callback);
});

function swallowError(error) {
    // If you want details of the error in the console
    console.log(error.toString());
    this.emit('end');
}

gulp.task('build-cleanup', () => {
    console.clear();
    console.clear();
    console.log(
        `===============================================[BUILD]======>`,
    );
    return gulp.src('./dist/', { read: false }).pipe(gulpClean());
});

gulp.task('build-html', () => {
    const content = getContent();
    return eventStream.merge([
        gulp
            .src('./src/templates/index.jade')
            .pipe(gulpJade({ pretty: true, locals: { content } }))
            .on('error', swallowError)
            .pipe(gulp.dest('./dist/')),
        ...content.articles.map((article) =>
            gulp
                .src(['./src/templates/article.jade'])
                .pipe(gulpJade({ pretty: true, locals: { article } }))
                .on('error', swallowError)
                .pipe(gulpRename(article.uri + '.html')) //todo maybe remove .html
                .pipe(gulp.dest('./dist/')),
        ),
    ]);
});

gulp.task('build-css', () => {
    return gulp
        .src('./src/style/index.scss')
        .pipe(gulpSass())
        .on('error', swallowError)
        .pipe(gulpRename('./index.css'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('copy-images', () => {
    return gulp.src('src/images/**', { base: 'src' }).pipe(gulp.dest('./dist'));
});

const Webpack = require('webpack');
const GulpWebpack = require('webpack-stream');
const Path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

gulp.task('build-js', () => {
    return gulp
        .src('./src/*')
        .pipe(
            GulpWebpack({
                entry: {
                    first: './src/script/index.js',
                },
                output: {
                    filename: 'index.js',
                    path: __dirname + '/dist',
                },
                target: 'web',
                devtool: 'source-map',
                module: {
                    loaders: [
                        {
                            test: /\.jsx?$/,
                            loaders: ['babel?presets[]=es2015&presets[]=react'],
                            include: [Path.resolve(__dirname, './src/script')],
                            exclude: [Path.resolve(__dirname, 'node_modules')],
                        },
                        {
                            test: /\.json$/,
                            loader: 'json',
                        },
                    ],
                    resolve: {
                        extensions: ['', '.js', '.jsx'],
                    },
                },
                plugins: [
                    new Webpack.DefinePlugin({
                        'process.env': {
                            NODE_ENV: JSON.stringify('production'),
                        },
                    }),
                    new UglifyJSPlugin({
                        sourceMap: true,
                    }),
                ],
            }),
        )
        .on('error', swallowError)
        .pipe(gulp.dest('./dist/'));
});

///--------------------------------------------------------

const GulpRunSequence = require('run-sequence');
const BrowserSync = require('browser-sync'); //todo use cases for modules

gulp.task('develop', ['build', 'browser-sync']);
gulp.task('browser-sync', () => {
    const browserSync = BrowserSync.create();
    browserSync.init({
        server: {
            baseDir: './dist',
        },
        open: true,
    });
    gulp.watch('./src/**/*', [
        'build',
        () => {
            browserSync.reload();
        },
    ]);
    //todo css reloading without reloading page
});

///--------------------------------------------------------

var ghpages = require('gh-pages');

gulp.task('deploy', (done) => {
    ghpages.publish(
        'dist',
        {
            repo: 'https://github.com/hejny/pavolhejny.git',
        },
        () => {
            console.log(arguments);
            done();
        },
    );
});
