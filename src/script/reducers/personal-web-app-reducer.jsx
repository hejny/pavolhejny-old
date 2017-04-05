import * as Immutable from "immutable";



export function personalWebAppReducer(oldState,action){

    console.groupCollapsed(`==[${action.type}]==>`);
    console.log(oldState.toJS());
    console.log('||');
    console.log('||');


    console.log(`[${action.type}]`,action);
    const newState = personalWebAppReducerCore(oldState,action);

    console.log('||');
    console.log('||');
    console.log('\\/');
    console.log(newState.toJS());
    if(oldState.equals(newState)){
        console.log('==>States are equal');
    }
    console.groupEnd();



    return newState;

}



function personalWebAppReducerCore(state,action){



    switch (action.type) {


        case 'CHANGE_STATE':

            return action.state;

        case 'CHANGE_LANGUAGE':

            return state.set('language',action.language);


        case 'CHANGE_VALUE':

            return state.set('value',action.value);

        case 'SHOW_ALL':

            return state.set('all',true);

        case 'SHOW_INTERESTING':

            return state.set('all',false);

        /*case 'SET_FILTER':

            return state.setIn(['filters',action.filter],action.value);

        case 'DROP_FILTER':

            return state.deleteIn(['filters',action.filter]);
        */

        case 'OPEN_ITEM':

            return state.set('opened_item_id',action.item);

        case 'CLOSE_CURRENT_ITEM':

            return state.set('opened_item_id',null);

        default:
            return state
    }



}