import * as ReactDOM from "react-dom";


import {App} from './main/personal-web-app.jsx';
import {PERSONAL} from './data/personal.js';


import {PersonalWebApp} from "./main/personal-web-app.jsx";
import {createStateFromUri} from "./main/create-state-from-uri.js";
import {createUriFromState} from "./main/create-uri-from-state.js";
import {createTitleFromState} from "./main/create-title-from-state.js";







window.addEventListener('load', function() {


    const defaultLanguae = 'en';


    const root = document.getElementById('root');
    const personalWebApp = new PersonalWebApp(PERSONAL);


    personalWebApp.setState(createStateFromUri(PERSONAL,window.location.pathname,defaultLanguae));



    window.onpopstate = (event) => {
        personalWebApp.setState(event.state);

        console.log('Onpopstate render...');
        ReactDOM.render(
            personalWebApp.createJSX(),
            root
        );

    };





    personalWebApp.subscribe(()=>{

        const state = personalWebApp.getState();

        //todo throttle
        const url =   createUriFromState(  PERSONAL,state);
        const title = createTitleFromState(PERSONAL,state);
        document.title = title;
        history.pushState(state,title,url);


        //------

        console.log('Render...');
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



let increment = 0;

function bgFrame(){


    //console.log('requestAnimationFrame');

    const deg = Math.round((new Date())/1000+increment)%360;
    //console.log(deg);

    const degI = (deg+90)%360;
    const color1 = `hsl(${deg} ,30%,90%)`;
    const color2 = `hsl(${degI},30%,90%)`;

    //${deg}deg
    document.body.style.background = `linear-gradient(0deg, ${color1}, ${color2})`;//#bbdcff, #cfffec
    document.body.style.backgroundPosition = `fixed`;


    requestAnimationFrame(bgFrame);
}
bgFrame();




document.body.addEventListener("mousemove", ()=>{
    increment+=0.5;
});





