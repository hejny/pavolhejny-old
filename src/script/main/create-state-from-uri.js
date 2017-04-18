


const host = window.location.hostname;
const hostParts = host.split('.');
const tdl = hostParts[hostParts.length-1];
const hostLanguage = tdl==='cz'?'cs':'en';




export function createStateFromUri(webStaticContent,uri){

    console.log(uri);

    const uriParts = uri.split('/').filter((part)=>part!=='');


    let all=false;
    let opened_item_id,opened_image_id,special_page=null;



    try{

        if(uriParts[1]||false){

            if(uriParts[1]!=='all') {


                const opened_item = webStaticContent.items.find((item) = > {
                        if(item.id === uriParts[1]
            )
                return true;
            })
                ;
                opened_item_id = opened_item.id;


                if (uriParts[2] || false) {
                    opened_image_id = uriParts[2];
                } else {
                    opened_image_id = null
                }


            }else
            if(uriParts[1]!=='404'){


                all = false;
                opened_item_id = null;
                opened_image_id=null;
                special_page='404';

            else{

                all = true;
                opened_item_id = null;
                opened_image_id=null

            }



        }else{
            opened_item_id = null;
            opened_image_id=null
        }


    }catch(error){

        //console.warn(error);
        //opened_item_id = null;

        throw new Error('Not found!');//todo semantic error types

    }





    return({
        language: uriParts[0]||hostLanguage,


        all: all,
        /*filters: {
            "interesting": true
        },*/


        opened_item_id,
        opened_image_id,
        special_page: special_page,

    });





}