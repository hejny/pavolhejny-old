

import * as React from "react";
import {translate,getMessage} from "../functions/translate.jsx";

import FontAwesome from 'react-fontawesome';

import moment from "moment";
import {PersonalWebItemsList} from "./personal-web-items-list.jsx";




export function PersonalWebItems(props) {


    const {store, items} = props;
    const stateJS = store.getState().toJS();


    return (

        <div>


            <h2>{stateJS.value}</h2>


            {/*<select value={stateJS.filters.status} onChange={(event)=>{

             if(event.target.value=='all'){
             store.dispatch({
             type: 'DROP_FILTER',
             filter: 'status',
             });
             }else{
             store.dispatch({
             type: 'SET_FILTER',
             filter: 'status',
             value: event.target.value
             });
             }



             }}>

             <option value="all">Vse</option>
             <option value="working">Pracuje</option>
             <option value="done">Hotovo</option>

             </select>*/}


            {stateJS.all ?
                <button onClick={(event)=> {
                    store.dispatch({
                        type: 'SHOW_INTERESTING'
                    });
                }}>{translate(stateJS.language, 'Show less')} <FontAwesome name="caret-square-o-up"/></button>
                : ''

            }


            <PersonalWebItemsList store={store} items={items.filter((item)=> {


                if ('parent' in item) {
                    return false;
                }

                if (stateJS.all) {
                    return true;
                } else {
                    return item.interesting || false;
                }

                /*for (let filteredKey in stateJS.filters) {
                 let filteredValue = stateJS.filters[filteredKey];

                 if (item[filteredKey] !== filteredValue) {
                 return false;
                 }

                 }
                 return true;*/


            })}/>


            {stateJS.all ? '' :
                <button onClick={(event)=> {
                    store.dispatch({
                        type: 'SHOW_ALL'
                    });
                }}>{translate(stateJS.language, 'Show more')} <FontAwesome name="caret-square-o-down"/></button>

            }


        </div>



    );


}
