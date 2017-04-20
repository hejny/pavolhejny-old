

import * as React from "react";
import {translate,getMessage} from "../functions/translate.jsx";

import FontAwesome from 'react-fontawesome';


import {PersonalWebItemTalk} from './personal-web-item-talk.jsx';
import {FBGallery} from './fb-gallery.jsx';



export function PersonalWebItem(props) {


    const {store, item, filtered} = props;
    const stateJS = store.getState().toJS();



    return(
        <div>




            {/*<button className="back" onClick={()=>store.dispatch({type:'CLOSE_CURRENT_ITEM'})}>
                {translate(stateJS.language,'Back')}
                <FontAwesome name="times" />
            </button>*/}


            <div className="logo" onClick={()=>store.dispatch({type:'CLOSE_CURRENT_ITEM'})}>
                <img itemProp="image" src="http://1.gravatar.com/avatar/3d98c15957c5f5dd227e53dbc7cbb60d?s=30&r=pg&d=mm" className="avatar" alt="Pavol Hejný"/>
                Pavol Hejný
            </div>



            <h1>{getMessage(stateJS.language,item.name)}</h1>
            {/*<div>{translate(stateJS.language,item.type)}</div>*/}






            {(()=>{

                let parts = [];

                for(let key in item){


                    let newPart = ((key,value)=> {

                        switch (key) {


                            case '--roles':

                                return(
                                    <div>


                                        {translate(stateJS.language,item.status)}



                                        {item.type=='PROJECT'?
                                            <div>{item.start} &mdash; {item.end}</div>
                                            :
                                            <div>{moment(item.date).format('LL')}</div>
                                        }





                                        {Object.keys(value).map(function(person) {

                                            let role = value[person];

                                            return(
                                                <div>
                                                    {person}
                                                    {role}
                                                </div>
                                            );

                                        })}





                                    </div>
                                );

                           {/* case 'status':

                                return(
                                    <div className={["status",value].join(' ')}>{translate(stateJS.language,value)}</div>
                                );*/}




                            case 'description':

                                return(
                                    <p>{getMessage(stateJS.language,value)}</p>
                                );


                            case 'fbgallery':


                                return(
                                    <FBGallery store={store} fb_gallery_id={value}/>
                                );


                            case 'links':


                                return  Object.keys(value).map((key)=>

                                    <a href={value[key]} target="_blank"><button>{translate(stateJS.language,key)} <FontAwesome name="external-link" /></button></a>

                                );



                            case 'embed':


                                return value.map((url)=><iframe src={url}/>);





                            /*case 'id':
                             case 'name':
                             case 'type':
                             case 'uri':
                             case 'interesting':
                             case 'sendpress':*/
                            default:
                                return null;
                                {/*return(
                                    <div key={key}>
                                        <h3>{key}</h3>
                                        {getMessage(stateJS.language,item[key])}
                                    </div>
                                );*/}
                        }


                    })(key,item[key]);



                    if(newPart){
                        parts.push(newPart);
                    }





                }


                return parts;

            })()}






            {/*{(()=>{
                switch(item.type){

                    case 'TALK':
                        return <PersonalWebItemTalk store={store} item={item} />
                    default:
                        return "Unknown type"
                }

            })()}*/}




        </div>
        );


}
