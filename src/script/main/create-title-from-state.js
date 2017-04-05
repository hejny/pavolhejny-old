
import {getMessage} from "../functions/translate.jsx";
import {WEB_NAME,TITLE_SEPARATOR} from '../config.jsx';


export function createTitleFromState(webStaticContent,stateJS){


    let titleParts = [];

    if(stateJS.opened_item_id) {
        titleParts.push(getMessage(
            stateJS.language,
            webStaticContent.items.find((item)=>item.id == stateJS.opened_item_id).name
        ));
    }
    titleParts.push(WEB_NAME);

    return titleParts.filter((part)=>part!=='').join(TITLE_SEPARATOR);



}