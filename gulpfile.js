const gulp = require('gulp');
const gulpRename = require('gulp-rename');
const gulpSass = require('gulp-sass');
const gulpJade = require('gulp-jade');
const gulpClean = require('gulp-clean');
const gulpSequence = require('gulp-sequence');
const gulpFile = require('gulp-file');
const eventStream = require('event-stream');
const moment = require('moment');

function requireUncached(module) {
    delete require.cache[require.resolve(module)];
    return require(module);
}

gulp.task('default', ['build']);

gulp.task('build', function(callback) {
    return gulpSequence(
        'build-cleanup',
        ['build-html', 'build-css', 'build-js', 'copy-images'],
        'build-finish',
    )(callback);
});

function swallowError(error) {
    // If you want details of the error in the console
    console.log(error.toString());
    this.emit('end');
}

gulp.task('build-cleanup', () => {
    console.log('\x1Bc');
    console.log(
        `===============================================[BUILD]======>`,
    );
    return gulp.src('./dist/', { read: false }).pipe(gulpClean());
});

gulp.task('build-finish', () => {
    const files = [
        {
            name: 'CNAME',
            content: `www.pavolhejny.com`,
        },
        {
            name: 'security.txt',
            content: `Contact: me@pavolhejny.com`,
        },
        {
            name: 'robots.txt',
            content: [
                'User-agent: *',
                'Disallow:',
                'Sitemap: https://www.pavolhejny.com/sitemap.xml',
            ].join('\n'),
        },
    ];

    return eventStream.merge(
        files.map((file) =>
            gulpFile(file.name, file.content, { src: true }).pipe(
                gulp.dest('./dist/'),
            ),
        ),
    );
});

gulp.task('build-html', () => {
    const content = requireUncached('./getContent')();

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
<url>
    <loc>https://www.pavolhejny.com/</loc>
    <lastmod>${moment().toISOString()}</lastmod>
    <priority>1</priority>
</url>
${content.articles
        .map(
            (article) => `
<url>
    <loc>https://www.pavolhejny.com/${article.uri}</loc>
    <lastmod>${article.updatedISO}</lastmod>
    <priority>0.5</priority>
</url>
`,
        )
        .join('\n\n')}
</urlset>
`;

    return eventStream.merge([
        gulp
            .src('./src/templates/index.jade')
            .pipe(gulpJade({ pretty: true, locals: { content } }))
            .on('error', swallowError)
            .pipe(gulp.dest('./dist/')),
        gulp
            .src('./src/templates/index.jade')
            .pipe(gulpJade({ pretty: true, locals: { content } }))
            .on('error', swallowError)
            .pipe(gulpRename('404.html')) //todo better 404 page
            .pipe(gulp.dest('./dist/')),
        gulpFile('sitemap.xml', sitemapXml, { src: true }).pipe(
            gulp.dest('./dist/'),
        ),
        ...content.articles
            //.filter((article) => article.isWritten)
            .map((article) =>
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
    return eventStream.merge([
        gulp.src('src/**/*.jpg', { base: 'src' }).pipe(gulp.dest('./dist')),
        gulp.src('src/**/*.png', { base: 'src' }).pipe(gulp.dest('./dist')),
        gulp.src('src/**/*.svg', { base: 'src' }).pipe(gulp.dest('./dist')),
    ]);
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

gulp.task('content', function(callback) {
    console.log('\x1Bc');
    const { articles } = requireUncached('./getContent')();
    console.log(articles.reverse());
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
            serveStaticOptions: {
                extensions: ['html'],
            },
        },
        open: true,
    });
    gulp.watch(
        ['./src/**/*', './getContent.js'],
        ['build', () => browserSync.reload()],
    );

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

///--------------------------------------------------------
const readline = require('readline');
const fs = require('fs');

gulp.task('article', function(callback) {
    console.log('\x1Bc');

    const readlineInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    //todo as promise
    readlineInterface.question(
        'URI of article eg.: measurecamp-bratislava-2018? ',
        (answer) => {
            //console.log(`Thank you for your valuable feedback: ${answer}`);

            const uri = answer;
            const articleDir = `./src/content/articles/${uri}`;
            const articleFile = `${articleDir}/${uri}.md`;
            const date = moment().format('YYYY-MM-DD');
            const articleContent = `# ${uri}

<!--date:${date}--${date}-->
<!--update:${date}-->

...

`;

            if (!fs.existsSync(articleDir)) {
                fs.mkdirSync(articleDir);
                fs.writeFileSync(articleFile, articleContent);
            } else {
                throw new Error(`This article already exists.`);
            }

            readlineInterface.close();
        },
    );
});
