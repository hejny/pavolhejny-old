

//import * as path from 'path';
import express from 'express';
var app = express();


//Static content
app.use('/media', express.static('../media/'));
app.use('/dist', express.static('../dist/'));
//todo favicon




app.get('/express-test', function (req, res) {
    res.send('Hello World!')
})





import * as ReactDOMServer from 'react-dom/server';

import {App} from './main/personal-web-app.jsx';
import {PERSONAL} from './data/personal.js';


import {PersonalWebApp} from "./main/personal-web-app.jsx";
import {createStateFromUri} from "./main/create-state-from-uri.js";
import {createUriFromState} from "./main/create-uri-from-state.js";
import {createTitleFromState} from "./main/create-title-from-state.js";


import * as fs from 'fs';
import * as html from "html";
//const indexHtml = fs.readFileSync(path.join(__dirname, '..','index.html'), 'utf8');
const indexHtml = fs.readFileSync('../index.html', 'utf8');



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


    res.send(outHtmlPretty);

});








app.listen(31415, function () {
    console.log('Example app listening on port 31415!')
})