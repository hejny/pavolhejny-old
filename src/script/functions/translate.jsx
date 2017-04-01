

const MESSAGES = {
    cs: {

        'Hello!': 'Ahoj!'


    }
};



export function translate(language,message){

    if(language!=='en'){

        try{

            return MESSAGES[language][message].toString();

        }catch(error){

            return language+'/'+message;

        }

    }else{
        return message;
    }





}