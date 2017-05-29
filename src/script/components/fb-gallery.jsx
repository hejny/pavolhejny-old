

import * as React from "react";


import {translate,getMessage} from "../functions/translate.jsx";
import {makeRequest} from "../resources/make-request.jsx";
import {Loading} from "./loading.jsx";
import {GALLERY_URL} from "../config.jsx";


import FontAwesome from 'react-fontawesome';

/*
const {store, fb_gallery_id} = props;
const stateJS = store.getState().toJS();
*/



export class FBGallery extends React.Component {


    constructor(props) {

        console.log('new gallery');

        super(props);
        this.state = {
            data: null
        };



        const url = `${GALLERY_URL}?id=${props.fb_gallery_id}`;


        makeRequest('GET',url).then((response)=>{


            setImmediate(()=>{

                response = JSON.parse(response);
                this.setState({
                    data: response.data
                });

            });



        });





    }


    render() {


        const stateJS = this.props.store.getState().toJS();



        let openedPicture = null;
        let openedPictureIndex = -1;
        let previousPicture = null;
        let nextPicture = null;



        if(this.state.data && stateJS.opened_image_id){
            openedPicture = this.state.data.find((picture)=>(stateJS.opened_image_id===picture.id));

            openedPictureIndex = this.state.data.indexOf(openedPicture);


            if(openedPictureIndex-1>=0){
                previousPicture = this.state.data[openedPictureIndex-1];
            }

            if(openedPictureIndex+1<=this.state.data.length-1){
                nextPicture = this.state.data[openedPictureIndex+1];
            }

        }



        return (
            <div className="fb-gallery">


                {!this.state.data ?
                    <Loading/>
                    :
                    <div>













                        {stateJS.opened_image_id?(
                            <div className="popup" onClick={()=>this.props.store.dispatch({type:'CLOSE_CURRENT_GALLERY_IMAGE'})}>



                                <div className="content" onClick={(event)=>event.stopPropagation()}>





                                    <div className="toolbar">


                                        <div className="previous"
                                             style={{
                                                 opacity: previousPicture?1:0.2,
                                                 cursor:  previousPicture?'Pointer':'not-allowed'
                                             }}
                                             onClick={()=>{if(previousPicture)this.props.store.dispatch({type:'OPEN_GALLERY_IMAGE',image:previousPicture.id})}}>
                                            <FontAwesome name="chevron-left" />
                                        </div>




                                        ({openedPictureIndex+1}/{this.state.data.length})



                                        <div className="next"
                                             style={{
                                                 opacity: nextPicture?1:0.2,
                                                 cursor:  nextPicture?'Pointer':'not-allowed'
                                             }}
                                             onClick={()=>{if(nextPicture)this.props.store.dispatch({type:'OPEN_GALLERY_IMAGE',image:nextPicture.id})}}>
                                            <FontAwesome name="chevron-right" />
                                        </div>





                                        <div className="close" onClick={()=>this.props.store.dispatch({type:'CLOSE_CURRENT_GALLERY_IMAGE'})}>
                                            <FontAwesome name="times-circle" />
                                        </div>


                                    </div>






                                    <img src={openedPicture.images[0].source} onClick={()=>{
                                        if(nextPicture){
                                            this.props.store.dispatch({type:'OPEN_GALLERY_IMAGE',image:nextPicture.id});
                                        }else{
                                            this.props.store.dispatch({type:'CLOSE_CURRENT_GALLERY_IMAGE'});
                                        }

                                    }}/>







                                </div>




                            </div>
                        ):''}














                        <ul className="items">
                            {this.state.data.map(picture=>{


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
                            <a
                                onClick={(event)=>{
                                    event.preventDefault();


                                    this.props.store.dispatch({type:'OPEN_GALLERY_IMAGE',image:picture.id});


                                }}
                                key={picture.id} href={picture.link} target="_blank">
                                <li className="item"><img src={picture.best_image.source}/></li>
                            </a>

                            )}
                        </ul>












                    </div>
                }







            </div>
        );
    }

}