

import * as React from "react";
import {translate,getMessage} from "../functions/translate.jsx";

import FontAwesome from 'react-fontawesome';

import moment from "moment";






function ItemInner(props){

    const {item,language} = props;


    return(
        <div>
            <h3>{getMessage(language,item.name)}</h3>

            {(item.type==='TALK')?item.date.toLocaleDateString(language):undefined}


            <div className={"type "+item.type} >
                {translate(language,item.type)}
                {('url' in item)?<FontAwesome name="external-link" />:undefined}

                {(item.type==='TALK')?


                ' '+translate(language,'at')+' '+item.event

                    :undefined}

            </div>






        </div>

    )

}






export function PersonalWebItemsList(props) {



    const {store, items} = props;
    const stateJS = store.getState().toJS();




    return(
        <div className="items">

            {items.map((item)=> {



                    /*const style = {
                        opacity: 'preparing' in item?0.5:1
                    };*/


                    if('url' in item){

                        return (
                            <a key={item.id} href={item.url} target="_blank">
                                <div className={"item "/*+item.type*/}>
                                    <ItemInner item={item} language={stateJS.language}/>
                                </div>
                            </a>

                        )
                    }else{

                        return (
                            <div key={item.id} className={"item "/*+item.type*/} onClick={()=>store.dispatch({type: 'OPEN_ITEM', item: item.id})}>
                                <ItemInner item={item} language={stateJS.language}/>
                            </div>

                        )

                    }





                }
            )}

        </div>
    )




}
