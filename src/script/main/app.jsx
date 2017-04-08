


import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Immutable from "immutable";
import { createStore } from 'redux';


import {PersonalWebApp} from "../components/personal-web-app.jsx";
import {personalWebAppReducer} from "../reducers/personal-web-app-reducer.jsx";

import { createHistoryReducer } from '../functions/create-history-reducer.jsx'
import {INITIAL_STATE} from '../config.jsx';


import moment from 'moment';
import 'moment/locale/cs';



import {createStateFromUri} from "./create-state-from-uri.js";

import {createUriFromState} from "./create-uri-from-state.js";
import {createTitleFromState} from "./create-title-from-state.js";





import {PERSONAL} from '../data/personal.js';




export class App{


    constructor(_container/*,_content*/) {


        //todo non pure
        let _content = PERSONAL;

        //todo non pure
        _content.items = _content.items.map((item)=>{



            /*start
            end
            date*/
            item.date = moment(item.date,'DD.MM.YYYY').toDate();


            return item;

        });



        this._container = _container;
        this._content = _content;
        this.init();
    }


    init(){


        const stateFromUri = createStateFromUri(this._content,window.location.pathname);


        this._store = createStore(
            createHistoryReducer(
                personalWebAppReducer
                ,createUriFromState.bind(this,this._content)
                ,createTitleFromState.bind(this,this._content)
                )
                //todo compatibility
            ,Immutable.fromJS(stateFromUri/*INITIAL_STATE*/)
        );




        window.onpopstate = (event) => {
            this._store.dispatch({type:'CHANGE_STATE',state: Immutable.fromJS(event.state)});
        };



        this.render();
        this._store.subscribe(this.render.bind(this));





        /*window.addEventListener("scroll", ()=>{
            this._store.dispatch({type:'CHANGE_SCROLL',scroll: window.scrollY});
        });*/




    }

    render(){


        const stateJS = this._store.getState().toJS();
        moment.locale(stateJS.language);


        ReactDOM.render(
            <PersonalWebApp store={this._store} content={this._content}/>,
            this._container
        );

        //window.scroll(0, stateJS.scroll||0);


    }

}



/*
import {makeRequest} from '../resources/make-request'
export async function getData() {

    let personal = JSON.parse(await makeRequest('GET','/data/personal.json'));
    let items = JSON.parse(await makeRequest('GET','/data/items.json'));

    personal.items = items;

    return personal;

}*/