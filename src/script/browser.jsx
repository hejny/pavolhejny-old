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



    function render() {


        console.log('Render...');
        ReactDOM.render(
            personalWebApp.createJSX(),
            root
        );



        const item = personalWebApp.getCurrentItem();
        if(item){
            document.body.setAttribute('data-opened-item',item.id);
        }else{
            document.body.setAttribute('data-opened-item','');//todo remove attr
        }


        /*try{

            const style = personalWebApp.getCurrentItem().style;

            console.log(style);

            document.body.style.backgroundImage = style.backgroundImage;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center center';
            document.body.style.backgroundRepeat = 'no-repeat';
            document.body.style.backgroundAttachment = 'fixed';


            document.body.style.color = style.color;


        }catch(error){

            document.body.style.backgroundImage = undefined;//todo defaults
            document.body.style.color = 'black';

            console.log(error);

        }*/


    }





    personalWebApp.subscribe(()=>{

        const state = personalWebApp.getState();

        //todo throttle
        const url =   createUriFromState(  PERSONAL,state);
        const title = createTitleFromState(PERSONAL,state);
        document.title = title;
        history.pushState(state,title,url);

        //------
        render();



    });



    render();



}, true);



/*
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
*/




