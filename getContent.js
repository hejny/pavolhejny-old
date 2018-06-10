const glob = require('glob');
const fs = require('fs');
const xpath = require('xpath');
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

function baseName(str)
{
   var base = new String(str).substring(str.lastIndexOf('/') + 1); 
    if(base.lastIndexOf(".") != -1)       
        base = base.substring(0, base.lastIndexOf("."));
   return base;
}

module.exports = function() {
    const articlesFiles = glob.sync('./src/content/articles/*.md');
    const articles = articlesFiles.map((articlesFile) => {

        const articleMarkdown = fs.readFileSync(articlesFile, 'utf8');
        const articleHtml = markdown.render(articleMarkdown);
        const articleDom = new dom().parseFromString(articleHtml);

        const result = xpath.select('h1', articleDom);
        const articleTitle = result[0].childNodes[0].nodeValue;

        return {
            title: articleTitle,
            uri: baseName(articlesFile),
            innerLabel: null,
            featuredImages:{
                front: 'http://localhost:3000/images/events/33692658_10155680999023590_4747848035172614144_n.jpg',
                back: 'http://localhost:3000/images/events/33692658_10155680999023590_4747848035172614144_n.jpg'
            },
            abstract: articleHtml,
            content: articleHtml,
        };
    });

    return {
        articles,
        years: [
            {
                label: 2018,
                articles
            },{
                label: 2017,
                articles
            }
        ]
    };
};
