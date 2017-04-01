import {API_URL} from '../config.jsx';

import * as _ from "lodash";

import {makeRequest} from '../resources/make-request.jsx';


export function createHistoryReducer(reducer,getTitleFromState,getUriFromState){



    let stateWaitingForPush;



    const debouncedPushState = _.debounce(()=>{


        const stateJS = stateWaitingForPush.toJS();
        history.pushState(stateJS, getTitleFromState(stateJS),getUriFromState(stateJS));
        document.title = getTitleFromState(stateJS);




    },500);




    return function(state,action){


        const newState = reducer(state,action);
        stateWaitingForPush = newState;

        if(action.type!=='CHANGE_STATE' && action.type!=='@@redux/INIT'){

            debouncedPushState();

        }

        return(newState);

    }


}
