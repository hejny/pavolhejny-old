





export function createStateFromUri(webStaticContent,uri,defaultLanguae='en'){

    console.log(uri);

    const uriParts = uri.split('/').filter((part)=>part!=='');


    let filter_types=[];
    let opened_item_id,opened_image_id,httpStatus=200;



    try{

        if(uriParts[1]||false){

            if(uriParts[1]!=='filter') {


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

                filter_types = uriParts[2].split('+');
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


        filter_types: filter_types,
        /*filters: {
            "interesting": true
        },*/


        opened_item_id,
        opened_image_id,
        httpStatus: httpStatus,

    });





}