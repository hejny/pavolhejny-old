

import * as React from "react";
import {translate} from "../functions/translate.jsx";

import FontAwesome from 'react-fontawesome';


import {PersonalWebItemTalk} from './personal-web-item-talk.jsx';



export function PersonalWebItem(props) {


    const {store, item, filtered} = props;
    const stateJS = store.getState().toJS();



    return(
        <div>




            <button onClick={()=>store.dispatch({type:'CLOSE_CURRENT_ITEM'})}>
                <FontAwesome name="times" /> Zpět
            </button>



            <h2>{item.name[stateJS.language]}</h2>
            <div>{translate(stateJS.language,item.type)}</div>




            {(()=>{

                let parts = [];

                for(let key in item){



                    parts.push(
                        <div key={key}>
                            <h3>{key}</h3>
                            {item[key].toString()}
                        </div>
                    );




                }


                return parts;

            })()}






            {(()=>{
                switch(item.type){

                    case 'TALK':
                        return <PersonalWebItemTalk store={store} item={item} />
                    default:
                        return "Unknown type"
                }

            })()}




        </div>
        );


}
