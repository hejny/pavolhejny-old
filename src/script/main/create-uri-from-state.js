
import {getMessage} from "../functions/translate.jsx";



export function createUriFromState(webStaticContent,stateJS){

    //return '/hovno';


    let uriParts = [];

    uriParts.push(stateJS.language);

    if(stateJS.opened_item_id) {



        uriParts.push(getMessage(
            stateJS.language,
            (webStaticContent.items.find((item)=>item.id == stateJS.opened_item_id).uri || stateJS.opened_item_id)
        ));


        if(stateJS.opened_image_id) {
            uriParts.push(stateJS.opened_image_id);
        }


    }else{

        if(stateJS.all){
            uriParts.push('all');
        }

    }


    return `/${uriParts.join('/')}`;



}