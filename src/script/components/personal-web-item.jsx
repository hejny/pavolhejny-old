

import * as React from "react";
import {translate,getMessage} from "../functions/translate.jsx";

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



            <h2>{getMessage(stateJS.language,item.name)}</h2>
            <div>{translate(stateJS.language,item.type)}</div>




            {(()=>{

                let parts = [];

                for(let key in item){


                    let newPart = ((key,item)=> {

                        switch (key) {

                            case 'id':
                            case 'name':
                            case 'type':
                            case 'uri':
                            case 'interesting':
                            case 'sendpress':


                                return null;

                            case 'gallery':

                                return(
                                    <div key={key}>
                                        <h3>{key}</h3>
                                        {item[key].map((image)=>

                                            <img src={image}/>

                                        )}
                                    </div>
                                );

                            default:
                                return(
                                    <div key={key}>
                                        <h3>{key}</h3>
                                        {getMessage(stateJS.language,item[key])}
                                    </div>
                                );
                        }


                    })(key,item);



                    if(newPart){
                        parts.push(newPart);
                    }





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
