

import * as React from "react";
import {translate} from "../functions/translate.jsx";

import FontAwesome from 'react-fontawesome';



export function PersonalWebItem(props) {


    const {store, item, filtered} = props;
    const stateJS = store.getState().toJS();



    return(
        <div>




            <button onClick={()=>store.dispatch({type:'CLOSE_CURRENT_ITEM'})}>
                <FontAwesome name="times" /> Zpět
            </button>




            <h2>{item.name[stateJS.language]}</h2>
            sss
        </div>
        );


}
