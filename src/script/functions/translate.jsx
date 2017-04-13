

const MESSAGES = {
    cs: {

        'Hello!': 'Ahoj!',


        'PROJECT': 'Project',
        'TALK': 'Přednáška',
        'ARTICLE': 'Článek',
        'WEB_APP': 'Webová aplikace',
        'WEB_PAGE': 'Webová stránka',
        'WEB_GAME': 'Hra na webu',
        'BOARD_GAME': 'Desková hra',
        'DESKTOP_APP': 'Desktopová aplikace',
        'MOBILE_APP': 'Mobilní aplikace',
        //'TI89_GAME': 'Hra pro kalkulačky TI89',





    },
    en:{
        'PROJECT': 'Projekt',
        'TALK': 'Talk',
        'ARTICLE': 'Article',
        'WEB_APP': 'Web app',
        'WEB_PAGE': 'Web page',
        'WEB_GAME': 'Web game',
        'BOARD_GAME': 'Board game',
        'DESKTOP_APP': 'Desktop app',
        'MOBILE_APP': 'Mobile app',
        //'TI89_GAME': 'Game for TI89',

    }
};




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