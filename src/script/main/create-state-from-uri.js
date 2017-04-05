


export function createStateFromUri(webStaticContent,uri){

    console.log(uri);

    const uriParts = uri.split('/').filter((part)=>part!=='');


    let all=false;
    let opened_item_id;



    try{

        if(uriParts[1]||false){

            if(uriParts[1]!=='all'){


                const opened_item = webStaticContent.items.find((item)=>{
                    if(item.id===uriParts[1])return true;
                });
                opened_item_id = opened_item.id;


            }else{

                all = true;
                opened_item_id = null;

            }



        }else{
            opened_item_id = null;
        }


    }catch(error){

        console.warn(error);
        opened_item_id = null;


    }





    return({
        language: uriParts[0],


        all: all,
        /*filters: {
            "interesting": true
        },*/


        opened_item_id: opened_item_id

    });





}