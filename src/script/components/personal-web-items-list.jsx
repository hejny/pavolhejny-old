

import * as React from "react";
import {translate,getMessage} from "../functions/translate.jsx";

import FontAwesome from 'react-fontawesome';

import moment from "moment";






function ItemInner(props){

    const {item,language} = props;


    return(
        <div>
            <h3>{getMessage(language,item.name)}</h3>


            {(item.type==='TALK')?<div>{item.date.toLocaleDateString(language)}</div>:undefined}


            <div className={"type "+item.type} >
                {translate(language,item.type)}

                {(item.type==='TALK')?


                ' '+translate(language,'at')+' '+item.event

                    :undefined}

                {('url' in item)?<FontAwesome name="external-link" />:undefined}



            </div>






        </div>

    )

}






export function PersonalWebItemsList(props) {



    const {store, items} = props;
    const stateJS = store.getState().toJS();




    return(
        <ul className="items">

            {items.map((item)=> {



                    /*const style = {
                        opacity: 'preparing' in item?0.5:1
                    };*/


                    if('url' in item){

                        return (
                            <a key={item.id} href={item.url} target="_blank">
                                <li className={"item "/*+item.type*/}>
                                    <ItemInner item={item} language={stateJS.language}/>
                                </li>
                            </a>

                        )
                    }else{

                        return (
                            <li key={item.id} className={"item "/*+item.type*/} onClick={()=>store.dispatch({type: 'OPEN_ITEM', item: item.id})}>
                                <ItemInner item={item} language={stateJS.language}/>
                            </li>

                        )

                    }





                }
            )}

        </ul>
    )




}
