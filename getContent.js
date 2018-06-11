const glob = require('glob');
const fs = require('fs');
const path = require('path');
const xpath = require('xpath');
const moment = require('moment');
const dom = require('xmldom').DOMParser;
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
            const uri = baseName(articlesFile);

            const articleMarkdown = fs.readFileSync(articlesFile, 'utf8');
            const articleHtml = markdown.render(articleMarkdown);
            const articleDom = new dom().parseFromString(articleHtml);

            const title = xpath.select('h1', articleDom)[0].childNodes[0]
                .nodeValue;
            const abstract = xpath.select('p', articleDom)[0].toString();

            const date = articleMarkdown
                .split('<!--date:')[1]
                .split('-->')[0]
                .split('--');
            const dateFrom = moment(date[0]);
            const dateTo = moment(
                date[1] === 'now' ? undefined : date[1] || date[0],
            );

            const images = glob.sync(path.dirname(articlesFile) + '/*.jpg');

            return {
                title,
                uri,
                dateFrom,
                dateTo,
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
                    front: images[0].split('./src/').join('/'),
                    back: images[0].split('./src/').join('/'),
                },
                abstract,
                content: articleHtml,
            };
        })
        .sort(
            (article1, article2) =>
                article1.dateTo.isBefore(article2.dateTo) ? 1 : -1,
        );

    const years = [];
    let currentYear = { label: null };
    for (const article of articles) {
        if (article.dateTo.year() !== currentYear.label) {
            currentYear = {
                label: article.dateTo.year(),
                articles: [],
            };
            years.push(currentYear);
        }
        currentYear.articles.push(article);
    }

    return { articles, years };
};
