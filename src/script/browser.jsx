import * as ReactDOM from "react-dom";


import {App} from './main/personal-web-app.jsx';
import {PERSONAL} from './data/personal.js';


import {PersonalWebApp} from "./main/personal-web-app.jsx";
import {createStateFromUri} from "./main/create-state-from-uri.js";
import {createUriFromState} from "./main/create-uri-from-state.js";
import {createTitleFromState} from "./main/create-title-from-state.js";







window.addEventListener('load', function() {


    const root = document.getElementById('root');
    const personalWebApp = new PersonalWebApp(PERSONAL);


    personalWebApp.setState(createStateFromUri(PERSONAL,window.location.pathname));



    window.onpopstate = (event) => {
        personalWebApp.setState(event.state);
    };



    personalWebApp.subscribe(()=>{


        const state = personalWebApp.getState();

        //todo throttle
        const url =   createUriFromState(  PERSONAL,state);
        const title = createTitleFromState(PERSONAL,state);
        history.pushState(state,title,url);


        //------

        console.log('Render...');
        //const state = personalWebApp.getState();
        ReactDOM.render(
            personalWebApp.createJSX(),
            root
        );


    });



    ReactDOM.render(
        personalWebApp.createJSX(),
        root
    );





}, true);




