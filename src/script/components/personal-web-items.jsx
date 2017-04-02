

import * as React from "react";
import {translate} from "../functions/translate.jsx";





export function PersonalWebItems(props) {


    const {store, items} = props;
    const stateJS = store.getState().toJS();


    return (

        <div>


            <h2>{stateJS.value}</h2>


            <select value={stateJS.filters.status} onChange={(event)=>{

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

            </select>


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
                            <div className="item" onClick={()=>store.dispatch({type: 'OPEN_ITEM', item: item.id})}>
                                <h3>{item.name[stateJS.language]}</h3>
                            </div>

                        )
                    }
                )}

            </div>

        </div>



    );


}
