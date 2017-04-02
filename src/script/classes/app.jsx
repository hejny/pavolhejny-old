


import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Immutable from "immutable";
import { createStore } from 'redux';



import {PersonalWebApp} from "../components/personal-web-app.jsx";
import {personalWebAppReducer} from "../reducers/personal-web-app-reducer.jsx";

import { createHistoryReducer } from '../functions/create-history-reducer.jsx'
import {INITIAL_STATE,WEB_NAME,TITLE_SEPARATOR} from '../config.jsx';





export class App{



    constructor(_container,_content) {
        this._container = _container;
        this._content = _content;
        this.init();
    }


    init(){


        this._store = createStore(
            createHistoryReducer(
                personalWebAppReducer
                ,(stateJS)=>{

                    let titleParts = [];
                    titleParts.push(stateJS.value.trim());
                    titleParts.push(WEB_NAME);

                    return titleParts.filter((part)=>part!=='').join(TITLE_SEPARATOR);


                }
                ,(stateJS)=>{

                    return `/${stateJS.language}/${stateJS.opened_item_id}`;

                }
                )
            ,Immutable.fromJS(INITIAL_STATE)
        );




        window.onpopstate = (event) => {
            this._store.dispatch({type:'CHANGE_STATE',state: Immutable.fromJS(event.state)});
        };



        this.render();
        this._store.subscribe(this.render.bind(this));


    }

    render(){


        const state = this._store.getState().toJS();

        ReactDOM.render(
            <PersonalWebApp store={this._store} content={this._content}/>,
            this._container
        );


    }

}