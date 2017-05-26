import {MESSAGES} from '../data/messages.js';



export function translate(language,message){

    //if(language!=='en'){

        try{

            return MESSAGES[language][message].toString();

        }catch(error){

            return message;
            //return language+'/'+message;

        }

    //}else{
    //    return message;
    //}


}






export function getMessage(language,language_object){

    if(typeof language_object === 'string'){

        return language_object;

    }else{

        return language_object[language];

    }



}