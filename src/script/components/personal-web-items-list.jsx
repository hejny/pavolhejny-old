

import * as React from "react";
import {translate,getMessage} from "../functions/translate.jsx";

import FontAwesome from 'react-fontawesome';

import moment from "moment";




export function PersonalWebItemsList(props) {



    const {store, items} = props;
    const stateJS = store.getState().toJS();






    return(
        <div class="items">

            {items.map((item)=> {



                    if('url' in item){

                        return (
                            <a href={item.url} target="_blank">
                                <div className={"item "/*+item.type*/}>

                                    <h3>{getMessage(stateJS.language,item.name)}</h3>

                                    <div className={"type "+item.type} >
                                        {translate(stateJS.language,item.type)}
                                        <FontAwesome name="external-link" />
                                    </div>
                                </div>
                            </a>

                        )
                    }else{

                        return (
                            <div className={"item "/*+item.type*/} onClick={()=>store.dispatch({type: 'OPEN_ITEM', item: item.id})}>

                                <h3>{getMessage(stateJS.language,item.name)}</h3>

                                <div className={"type "+item.type} >
                                    {translate(stateJS.language,item.type)}
                                </div>
                            </div>

                        )

                    }





                }
            )}

        </div>
    )




}
