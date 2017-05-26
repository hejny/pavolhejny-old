import * as React from "react";
import {translate,getMessage} from "../functions/translate.jsx";

import FontAwesome from 'react-fontawesome';

import moment from "moment";
import {PersonalWebItemsList} from "./personal-web-items-list.jsx";




function isInTypes(type,types){
    return type.split('_').some((subtype)=>types.indexOf(subtype)!==-1);
}




export function PersonalWebItems(props) {


    const {store, items} = props;
    const stateJS = store.getState().toJS();


    return (

        <div>


            <h2>{stateJS.value}</h2>



            {stateJS.filter_types.length ?

                <div>


                    <button onClick={(event)=> {store.dispatch({type: 'SET_FILTER_TYPES', value:[]});}}>
                        {/*{translate(stateJS.language, 'Show less')} <FontAwesome name="caret-square-o-up"/>*/}
                        <FontAwesome name="home" />
                        {translate(stateJS.language,'Back')}

                    </button>

                    <PersonalWebItemsList store={store} items={items.filter((item)=> {


                        /*if ('parent' in item) {
                            return false;
                        }*/


                        if(!isInTypes(item.type,stateJS.filter_types)){
                            return false;
                        }


                        return true;


                    })}/>


                </div>
                :

                <div>

                    <h2>{translate(stateJS.language, 'Projects')}</h2>


                    <PersonalWebItemsList store={store} items={items.filter((item)=> {


                        /*if ('parent' in item) {
                            return false;
                        }*/

                        if (!stateJS.all && !item.interesting) {
                            return false;
                        }


                        if(!isInTypes(item.type,['PROJECT','APP','GAME'])){
                            return false;
                        }


                        return true;


                    })}/>



                    <button onClick={(event)=> {
                        store.dispatch({
                            type: 'SET_FILTER_TYPES',
                            value:['PROJECT','APP','GAME']
                        });
                    }}>
                        <FontAwesome name="caret-square-o-down"/>
                        {translate(stateJS.language, 'Show more')}
                    </button>




                    <h2>{translate(stateJS.language, 'Talks')}</h2>


                    <PersonalWebItemsList store={store} items={items.filter((item)=> {


                        /*if ('parent' in item) {
                            return false;
                        }*/

                        if (!stateJS.all && !item.interesting) {
                            return false;
                        }


                        if(!isInTypes(item.type,['TALK','ARTICLE'])){
                            return false;
                        }


                        return true;


                    })}/>





                    <button onClick={(event)=> {
                        store.dispatch({
                            type: 'SET_FILTER_TYPES',
                            value:['TALK','ARTICLE']
                        });
                    }}>
                        <FontAwesome name="caret-square-o-down"/>
                        {translate(stateJS.language, 'Show more')}
                    </button>


                </div>

            }





        </div>



    );


}
