

import * as React from "react";


import {translate,getMessage} from "../functions/translate.jsx";
import {makeRequest} from "../resources/make-request.jsx";
import {Loading} from "./loading.jsx";


/*
const {store, fb_gallery_id} = props;
const stateJS = store.getState().toJS();
*/



export class FBGallery extends React.Component {


    constructor(props) {


        super(props);
        this.state = {
            data: null
        };



        const url = `http://localhost/pavolhejny/gallery.php?id=${props.fb_gallery_id}`;


        makeRequest('GET',url).then((response)=>{


            setTimeout(()=>{

                response = JSON.parse(response);
                this.setState({
                    data: response.data
                });

            },0);



        });





    }


    render() {
        return (
            <div className="fb-gallery">



                <ul>
                {!this.state.data?
                    <Loading/>
                    :this.state.data.map(picture=>{


                    const fit_images = picture.images.filter(image=>{
                        return (image.width>=200 && image.height>=200)
                    });



                    if(fit_images.length===0){
                        picture.best_image = picture.images[0];
                    }else{
                        picture.best_image = fit_images[fit_images.length-1];
                    }


                    return picture;


                }).map(picture=>
                    <a key={picture.id} href={picture.link} target="_blank">
                        <li className="item">
                            <img src={picture.best_image.source}/>
                        </li>
                    </a>
                )}

                </ul>


            </div>
        );
    }

}