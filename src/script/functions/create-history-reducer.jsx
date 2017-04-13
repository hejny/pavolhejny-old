import {API_URL} from '../config.jsx';

import * as _ from "lodash";

import {makeRequest} from '../resources/make-request.jsx';


export function createHistoryReducer(reducer,createUriFromState,createTitleFromState){



    let stateWaitingForPush;



    const debouncedPushState = _.debounce(()=>{


        const stateJS = stateWaitingForPush.toJS();
        history.pushState(stateJS, createTitleFromState(stateJS),createUriFromState(stateJS));
        document.title = createTitleFromState(stateJS);




    },20);




    return function(state,action){


        const newState = reducer(state,action);
        stateWaitingForPush = newState;

        if(action.type!=='CHANGE_STATE' && action.type!=='@@redux/INIT'){

            debouncedPushState();

        }

        return(newState);

    }


}
