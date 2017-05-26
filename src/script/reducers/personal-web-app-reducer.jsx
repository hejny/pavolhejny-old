import * as Immutable from "immutable";



function isBrowser(){try {return this===window;}catch(e){ return false;}}



export function personalWebAppReducer(oldState,action){

    if(isBrowser()){

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


    }else{

        const newState = personalWebAppReducerCore(oldState,action);
        return newState;

    }

}



function personalWebAppReducerCore(state,action){



    switch (action.type) {


        /*case 'CHANGE_STATE':

            return action.state;
        */
        case 'CHANGE_LANGUAGE':

            return state.set('language',action.language);


        case 'CHANGE_SCROLL':

            return state.set('scroll',action.scroll);

        case 'SET_FILTER_TYPES':

            return state.set('filter_types',Immutable.fromJS(action.value));


        case 'OPEN_ITEM':

            return state.set('opened_item_id',action.item);

        case 'CLOSE_CURRENT_ITEM':

            return state.set('opened_item_id',null);





        case 'OPEN_GALLERY_IMAGE':

            return state.set('opened_image_id',action.image);

        case 'CLOSE_CURRENT_GALLERY_IMAGE':

            return state.set('opened_image_id',null);






        default:
            return state
    }



}