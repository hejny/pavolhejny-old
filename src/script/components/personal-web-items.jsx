

import * as React from "react";
import {translate} from "../functions/translate.jsx";

import FontAwesome from 'react-fontawesome';

import moment from "moment";




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


            {stateJS.filters.interesting?'':
                <button onClick={(event)=>{
                    store.dispatch({
                        type: 'SET_FILTER',
                        filter: 'interesting',
                        value: true,
                    });
                }}>Show less <FontAwesome name="caret-square-o-up" /></button>

            }



            <div>

                {items.filter((item)=> {


                    for (let filteredKey in stateJS.filters) {
                        let filteredValue = stateJS.filters[filteredKey];

                        if (item[filteredKey] !== filteredValue) {
                            return false;
                        }

                    }
                    return true;


                }).map((item)=> {


                        return (
                            <div className={"item "+item.type} onClick={()=>store.dispatch({type: 'OPEN_ITEM', item: item.id})}>


                                <h3>{item.name[stateJS.language]}</h3>




                                {item.type=='PROJECT'?
                                    <div>{item.start} &mdash; {item.end}</div>
                                    :
                                    <div>{moment(item.date).format('LL')}</div>
                                }




                            </div>

                        )
                    }
                )}

            </div>




            {stateJS.filters.interesting?
                <button onClick={(event)=>{
                    store.dispatch({
                        type: 'DROP_FILTER',
                        filter: 'interesting',
                    });
                }}>Show more <FontAwesome name="caret-square-o-down" /></button>
                :''
            }





        </div>



    );


}
