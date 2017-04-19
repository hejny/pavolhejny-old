





export function createStateFromUri(webStaticContent,uri,defaultLanguae='en'){

    console.log(uri);

    const uriParts = uri.split('/').filter((part)=>part!=='');


    let all=false;
    let opened_item_id,opened_image_id,httpStatus=200;



    try{

        if(uriParts[1]||false){

            if(uriParts[1]!=='all') {


                const opened_item = webStaticContent.items.find((item) => {
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


            }else{

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
        httpStatus = 404;
        opened_item_id = null;

    }




    let language = uriParts[0]||defaultLanguae;
    if(['cs','en']/*todo const*/.indexOf(language)===-1){
        language=defaultLanguae;
        httpStatus = 404;
    }


    return({
        language: language,


        all: all,
        /*filters: {
            "interesting": true
        },*/


        opened_item_id,
        opened_image_id,
        httpStatus: httpStatus,

    });





}