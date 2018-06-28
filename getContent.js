const glob = require('glob');
const fs = require('fs');
const path = require('path');
const xpath = require('xpath');
const moment = require('moment');
const sanitizeHtml = require('sanitize-html');
const DOMParser = require('xmldom').DOMParser;
const markdown = require('markdown-it')({
    html: true, // Enable HTML tags in source
    xhtmlOut: true, // Use '/' to close single tags (<br />).
    // This is only for full CommonMark compatibility.
    breaks: false, // Convert '\n' in paragraphs into <br>
    langPrefix: 'language-', // CSS language prefix for fenced blocks. Can be
    // useful for external highlighters.
    linkify: false, // Autoconvert URL-like text to links

    // Enable some language-neutral replacement + quotes beautification
    typographer: false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '“”‘’',

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externally.
    // If result starts with <pre... internal wrapper is skipped.
    highlight: function(/*str, lang*/) {
        return '';
    },
});

function baseName(str) {
    var base = new String(str).substring(str.lastIndexOf('/') + 1);
    if (base.lastIndexOf('.') != -1)
        base = base.substring(0, base.lastIndexOf('.'));
    return base;
}

/*function fileFallback(...files) {
    for (const file of files.reverse()) {
        if (fs.existsSync(file)) {
            return file;
        }
    }
    return ''; //todo better
}*/

module.exports = function() {
    const articlesFiles = glob.sync('./src/content/articles/**/*.md');
    const articles = articlesFiles
        .map((articlesFile) => {
            //console.log(`Parsing ${articlesFile}`);
            const uri = baseName(articlesFile);

            const articleMarkdown = fs.readFileSync(articlesFile, 'utf8');
            const articleHtml = markdown.render(articleMarkdown);
            let problems = [];
            const articleDom = new DOMParser({
                locator: {},
                errorHandler: {
                    warning: (warning) => problems.push(warning),
                    error: (error) => problems.push(error),
                },
            }).parseFromString(articleHtml);

            if (problems.length) {
                console.warn('\x1b[41m');
                console.warn(
                    `There are ${
                        problems.length
                    } problems while parsing ${articlesFile}`,
                ); //todo show detail
                console.warn('\x1b[43m', '\x1b[30m');
                for (const problem of problems) {
                    console.log(problem);
                }
                console.log('\x1b[47m');
                console.log(
                    articleHtml
                        .split('\n')
                        .map((line, index) => `[${index + 1}] ${line}`)
                        .join('\n'),
                );
                console.log('\x1b[0m');
            }
            /*for(const place of xpath.select('//place', articleDom)){
                place.setAttribute('a','a');
                // /console.log('place',place);
            }*/
            //const articleHtml = articleHtmlRaw.toString();

            const title = xpath.select('//h1', articleDom)[0].childNodes[0]
                .nodeValue;
            const abstract = xpath.select('//p', articleDom)[0].toString();

            const date = articleMarkdown
                .split('<!--date:')[1]
                .split('-->')[0]
                .split('--');
            const dateFrom = moment(date[0]);
            const dateTo = moment(
                date[1] === 'now' ? undefined : date[1] || date[0],
            );

            //const DATE_FORMAT = 'YYYY-MM-DD';
            //const dateLabelFrom = dateFrom.format(DATE_FORMAT);
            //const dateLabelTo = dateTo.format(DATE_FORMAT);
            //const dateLabel = dateLabelFrom===dateLabelTo?dateLabelFrom:`${dateLabelFrom} – ${dateLabelTo}`;
            const dateLabel = date.join(' – ');

            const isHidden = articleMarkdown.indexOf('<!--hidden-->') !== -1;
            const isWritten = xpath.select('p', articleDom).length > 1;
            const isFinished =
                isWritten &&
                articleMarkdown.indexOf('<!--not-finished-->') === -1;


            const images = glob.sync(
                path.dirname(articlesFile) + '/*.{jpg,png}',
            );
            const featuredImages = glob.sync(
                path.dirname(articlesFile) + '/featured.{jpg,png}',
            );
            featuredImages[0] = featuredImages[0] || '/images/default-featured.jpg';

            return {
                title,
                uri,
                dateFrom,
                dateTo,
                updatedISO: moment(date[0]).toISOString(), //todo take from updated
                dateLabel,
                innerLabel:
                    dateFrom.year() === dateTo.year()
                        ? null
                        : `${dateFrom.year()} ‒ ${dateTo.year()}`,
                /*featuredImages: {
                front: fileFallback(
                    `./src/images/articles/${uri}.jpg`,
                    `./src/images/articles/${uri}-front.jpg`,
                )
                    .split('./src/')
                    .join('/'),
                back: fileFallback(
                    `./src/images/articles/${uri}.jpg`,
                    `./src/images/articles/${uri}-back.jpg`,
                )
                    .split('./src/')
                    .join('/'),
            },*/
                featuredImages: {
                    front: featuredImages[0].split('./src/').join('/'),
                    back: featuredImages[0].split('./src/').join('/'),
                },
                images,
                abstract,
                abstractText: sanitizeHtml(abstract, { allowedTags: [] }),
                content: articleHtml,
                isHidden,
                isWritten,
                isFinished,
            };
        })
        .sort(
            (article1, article2) =>
                article1.dateTo.isBefore(article2.dateTo) ? 1 : -1,
        );

    articles.forEach((article, articleIndex) => {
        article.articlePrevious = articles[articleIndex + 1] || null;
        article.articleNext = articles[articleIndex - 1] || null;
    });

    const presentationsFiles = glob.sync('./src/content/presentations/**/*.md');
    const presentations = presentationsFiles.map((presentationFile) => {
        const uri = baseName(presentationFile);
        const articleMarkdown = fs.readFileSync(presentationFile, 'utf8');

        return {
            uri,
            content: articleMarkdown,
        };
    });

    const years = [];
    let currentYear = { label: null };
    for (const article of articles.filter((article) => !article.isHidden)) {
        if (article.dateTo.year() !== currentYear.label) {
            currentYear = {
                label: article.dateTo.year(),
                articles: [],
            };
            years.push(currentYear);
        }
        currentYear.articles.push(article);
    }

    return { articles, years, presentations };
};
