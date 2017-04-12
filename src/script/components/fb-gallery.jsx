

import * as React from "react";


import {translate,getMessage} from "../functions/translate.jsx";
import {makeRequest} from "../resources/make-request.jsx";
import {Loading} from "./loading.jsx";


import FontAwesome from 'react-fontawesome';

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


        const stateJS = this.props.store.getState().toJS();



        let openedPicture = null;
        let previousPicture = null;
        let nextPicture = null;


        if(stateJS.opened_image_id){
            openedPicture = this.state.data.find((picture)=>(stateJS.opened_image_id===picture.id));

            const previousPictureIndex = this.state.data.indexOf(openedPicture)-1;
            const nextPictureIndex = this.state.data.indexOf(openedPicture)+1;


            if(previousPictureIndex>=0){
                previousPicture = this.state.data[previousPictureIndex];
            }

            if(nextPictureIndex<=this.state.data.length-1){
                nextPicture = this.state.data[nextPictureIndex];
            }

        }



        return (
            <div className="fb-gallery">



                {stateJS.opened_image_id?(
                    <div className="popup" onClick={()=>this.props.store.dispatch({type:'CLOSE_CURRENT_GALLERY_IMAGE'})}>



                        <div className="content" onClick={(event)=>event.stopPropagation()}>




                            {previousPicture?
                                <div className="previous" onClick={()=>this.props.store.dispatch({type:'OPEN_GALLERY_IMAGE',image:previousPicture.id})}>
                                    <FontAwesome name="chevron-left" />
                                </div>
                                :''}


                            <img src={openedPicture.images[0].source} onClick={()=>{
                                if(nextPicture){
                                    this.props.store.dispatch({type:'OPEN_GALLERY_IMAGE',image:nextPicture.id});
                                }else{
                                    this.props.store.dispatch({type:'CLOSE_CURRENT_GALLERY_IMAGE'});
                                }

                            }}/>



                            {nextPicture?
                                <div className="next">
                                    <FontAwesome name="chevron-right" onClick={()=>this.props.store.dispatch({type:'OPEN_GALLERY_IMAGE',image:nextPicture.id})}/>
                                </div>
                                :''}


                            <div className="close" onClick={()=>this.props.store.dispatch({type:'CLOSE_CURRENT_GALLERY_IMAGE'})}>
                                <FontAwesome name="times-circle" />
                            </div>






                        </div>




                    </div>
                ):''}










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
                    <a
                        onClick={(event)=>{
                            event.preventDefault();


                            this.props.store.dispatch({type:'OPEN_GALLERY_IMAGE',image:picture.id});


                        }}
                        key={picture.id} href={picture.link} target="_blank">
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