import express from 'express';
var app = express();






//Static content
app.use('/media', express.static(path.join(__dirname, '../media/')))
app.use('/dist', express.static(path.join(__dirname, '../dist/')))
//todo favicon




app.get('/express-test', function (req, res) {
    res.send('Hello World!')
})





import * as ReactDOMServer from 'react-dom/server';

import {App} from './main/personal-web-app.jsx';
import {PERSONAL} from './data/personal.js';


import {PersonalWebApp} from "./main/personal-web-app.jsx";
import {createStateFromUri} from "./main/create-state-from-uri.js";
//import {createUriFromState} from "./main/create-uri-from-state.js";
//import {createTitleFromState} from "./main/create-title-from-state.js";


import * as fs from 'fs';
const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');



app.get('/*', function (req, res) {


    const root = document.getElementById('root');
    const personalWebApp = new PersonalWebApp(PERSONAL);

    let state;

    try{

        state = createStateFromUri(req.path);
        res.status(200);

    }catch(error){//todo catch other errors

        res.status(404);
        state = createStateFromUri('/404');
        //todo maybe special page for 404

    }



    personalWebApp.setState(state);
    const rootHtml = ReactDOMServer.renderToStaticMarkup(personalWebApp.createJSX());


    const html = indexHtml.split('<!--root-->').join(rootHtml);

    res.send(html);

});








app.listen(31415, function () {
    console.log('Example app listening on port 31415!')
})