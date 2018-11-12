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

module.exports = function() {
    const presentationsFiles = glob.sync('./src/content/presentations/**/*.md');
    const presentations = presentationsFiles.map((presentationFile) => {
        const uri = baseName(presentationFile);
        const articleMarkdown = fs.readFileSync(presentationFile, 'utf8');

        const articleHtml = markdown.render(articleMarkdown);
        let problems = [];
        const articleDom = new DOMParser({
            locator: {},
            errorHandler: {
                warning: (warning) => problems.push(warning),
                error: (error) => problems.push(error),
            },
        }).parseFromString(articleHtml);
        const title = xpath.select('//h1', articleDom)[0].childNodes[0]
            .nodeValue;

        return {
            uri,
            title,
            content: articleMarkdown,
        };
    });

    return { presentations };
};
