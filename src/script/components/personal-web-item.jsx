

import * as React from "react";
import {translate} from "../functions/translate.jsx";



export function PersonalWebItem(props) {


    const {store, item, filtered} = props;
    const stateJS = store.getState().toJS();



    return(
        <div className={'item '+(filtered?'highlighted':'suppressed')}>
            <h2>{item.name[stateJS.language]}</h2>
            sss
        </div>
        );


}
