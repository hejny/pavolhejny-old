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

        default:
            return state
    }



}