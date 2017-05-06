

import * as path from 'path';
import express from 'express';
var app = express();
import requestPromise from 'request-promise';






//Static content
app.use('/media', express.static('./media/'));
app.use('/dist', express.static('./dist/'));
//app.use('/media', express.static(path.join(__dirname,'../media/')));
//app.use('/dist', express.static(path.join(__dirname,'../dist/')));
//todo favicon





//import {FB_APP_ID,FB_APP_SECRET} from './config-server';


//const config = JSON.parse(fs.readFileSync(path.join(__dirname, '../config-server.json'), 'utf8'));
const FB_APP_ID = process.env.FB_APP_ID;//config.FB_APP_ID;
const FB_APP_SECRET = process.env.FB_APP_SECRET;//config.FB_APP_SECRET;



app.get('/api/gallery', function (req, res) {


    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', 'application/json');


    const url = `https://graph.facebook.com/v2.8/${req.param('id')}/photos?fields=id%2Clink%2Cname%2Cimages%2Cpicture&limit=999&access_token=${FB_APP_ID}|${FB_APP_SECRET}`;

    requestPromise(url)
        .then((data)=>{
            res.send(data);
        }).catch((error)=>{
            res.send(error.response.body);
    });




});





import * as ReactDOMServer from 'react-dom/server';

import {App} from './main/personal-web-app.jsx';
import {PERSONAL} from './data/personal.js';


import {PersonalWebApp} from "./main/personal-web-app.jsx";
import {createStateFromUri} from "./main/create-state-from-uri.js";
import {createUriFromState} from "./main/create-uri-from-state.js";
import {createTitleFromState} from "./main/create-title-from-state.js";


import * as fs from 'fs';
import * as util from 'util';
import * as html from "html";


const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><!--title--></title>

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="/dist/personal-web.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.2.3/css/simple-line-icons.css">



    <link rel="shortcut icon" href="https://1.gravatar.com/avatar/3d98c15957c5f5dd227e53dbc7cbb60d?s=64&r=pg&d=mm ?>" />






    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-70710834-1', 'auto');
        ga('send', 'pageview');

    </script>



    <script src="/dist/browser.js" async></script>


    <!--build-info-->


</head>
<body>


<div id="root"><!--root--></div>


</body>
</html>
`;

//const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
//const stats = fs.statSync(__filename);
//const mtime = new Date(util.inspect(stats.mtime));


const BUILD_INFO = `
        (cc) Pavol Hejný
        https://github.com/hejny/pavolhejny
        Process started at ${(new Date()).toString()}
    `;
const HOSTNAME = process.env.HOSTNAME||null;
const HOSTNAME_ALIASES = JSON.parse(process.env.HOSTNAMES||'{}');



app.get('/*', function (req, res) {


    //-----------------Get language from domain name
    const host = req.host;
    const hostParts = host.split('.');
    const tdl = hostParts[hostParts.length-1];
    const defaultLanguae = tdl==='cz'?'cs':'en';
    //-----------------



    const personalWebApp = new PersonalWebApp(PERSONAL);

    let state;


    state = createStateFromUri(PERSONAL,req.path,defaultLanguae);


    if(state.httpStatus===200) {


        if(HOSTNAME) {
            if(HOSTNAME!==req.req.headers.host) {
                for (let alias in HOSTNAME_ALIASES) {
                    console.log(req.headers.host, alias);
                    if (req.headers.host === alias) {
                        res.redirect(301, `//${HOSTNAME}${HOSTNAME_ALIASES[alias]}`);
                        return;
                    }
                }

                res.redirect(301, `//${HOSTNAME}`);
                return;
            }
        }



        const normalizedUri = createUriFromState(PERSONAL,state);

        if (req.path !== normalizedUri) {
            res.redirect(301,normalizedUri);
            return;
        }


    }


    res.status(state.httpStatus);




    personalWebApp.setState(state);

    const title = createTitleFromState(PERSONAL,state);
    const rootHtml = ReactDOMServer.renderToStaticMarkup(personalWebApp.createJSX());



    const outHtml = indexHtml
        .split('<!--title-->').join(title)
        .split('<!--root-->').join(rootHtml)
        .split('browser.js').join('browser.min.js')
        ;
    const outHtmlPretty = html.prettyPrint(outHtml, {indent_size: 4});



    const outHtmlPrettyWithInfo = outHtmlPretty
        .split('<!--build-info-->').join(`<!--${BUILD_INFO}-->`);



    res.send(outHtmlPrettyWithInfo);

});





app.set('port', (process.env.PORT || 5000));


app.listen(app.get('port'), function () {
    console.log(`Example app listening on port ${app.get('port')}!`)
});