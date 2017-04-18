


import * as React from "react";
import * as Immutable from "immutable";
import { createStore } from 'redux';


import {PersonalWebAppComponent} from "../components/personal-web-app.jsx";
import {personalWebAppReducer} from "../reducers/personal-web-app-reducer.jsx";

//import { createHistoryReducer } from '../functions/create-history-reducer.jsx'
//import {INITIAL_STATE} from '../config.jsx';


import moment from 'moment';
import 'moment/locale/cs';





export class PersonalWebApp{


    constructor(content) {


        //todo non pure
        content.items = content.items.map((item)=>{


            /*start
            end
            date*/
            item.date = moment(item.date,'DD.MM.YYYY').toDate();


            return item;

        });



        this._content = content;
        this._subscribers = [];
        this._stateInitialized = false;
    }

    _stateInitializedCheck(){
        if(!this._stateInitialized){
            throw new Error(`State was not set yet.`);
        }
    }


    setState(state){

        this._store = createStore(
            personalWebAppReducer
                //todo backward compatibility
            ,Immutable.fromJS(state)
        );
        this._store.subscribe(this._triggerSubscribers.bind(this));
        this._stateInitialized = true;

    }


    getState(){
        this._stateInitializedCheck();
        return this._store.getState().toJS();
    }


    subscribe(subscriberCallback){
        this._subscribers.push(subscriberCallback);
    }

    _triggerSubscribers(){
        this._subscribers.forEach((subscriberCallback)=>{
            subscriberCallback();
        });

    }

    createJSX(){

        this._stateInitializedCheck();
        const stateJS = this._store.getState().toJS();
        moment.locale(stateJS.language);

        return <PersonalWebAppComponent store={this._store} content={this._content}/>;
    }

}