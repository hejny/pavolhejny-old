

import * as React from "react";


import {translate} from "../functions/translate.jsx";
import {PersonalWebItem} from "./personal-web-item.jsx";



export function PersonalWebApp(props) {

    const {store, content} = props;
    const stateJS = store.getState().toJS();


    return (
            <div className="personal-web">


                {['en','cs'].map((language)=>
                    <img key={language} src={`/media/images/flags/${language}.png`} style={{boxShadow:language===stateJS.language?'black 0px 0px 5px':'none',opacity:language===stateJS.language?1:0.7,margin:3}} onClick={()=>store.dispatch({type:'CHANGE_LANGUAGE',language})}/>
                )}



                <h1>{content.name}</h1>
                <h1>{translate(stateJS.language,'Hello!')}</h1>



                <h2>{stateJS.value}</h2>
                <input type="text" value={stateJS.value} onChange={(event)=>store.dispatch({type:'CHANGE_VALUE',value:event.target.value})}/>
                <input type="color" value={stateJS.value} onChange={(event)=>store.dispatch({type:'CHANGE_VALUE',value:event.target.value})}/>


                {content.items.map((item,index)=>
                <PersonalWebItem key={index} store={store} item={item}/>
                )}



            </div>
    );

}
