

import * as React from "react";


import {translate} from "../functions/translate.jsx";
import {PersonalWebItem} from "./personal-web-item.jsx";



export function PersonalWebApp(props) {

    const {store, content} = props;
    const stateJS = store.getState().toJS();


    return (
            <div className="personal-web">



                <div className="languages">
                    {['en','cs'].map((language)=>
                        <img key={language} src={`/media/images/flags/${language}.png`} style={{boxShadow:language===stateJS.language?'black 0px 0px 5px':'none',opacity:language===stateJS.language?1:0.7,margin:3}} onClick={()=>store.dispatch({type:'CHANGE_LANGUAGE',language})}/>
                    )}
                </div>



                {/*<h1>{translate(stateJS.language,'Hello!')}</h1>*/}




                <article className="about">
                    <div className="profile" itemScope itemType="http://schema.org/Person">

                        <img itemProp="image" src="http://1.gravatar.com/avatar/3d98c15957c5f5dd227e53dbc7cbb60d?s=300&r=pg&d=mm" className="avatar" alt="Pavol Hejný"/>
                        <br/>
                        <h1 className="name" itemProp="name">{content.name}</h1>
                        <br/>
                        <div className="subname" itemProp="jobTitle">{content.subname[stateJS.language]}</div>

                    </div>

                    <br/>

                    <div className="about_text" itemProp="description">
                        My name is Pavol Hejný live in Prague (Czech Republic). In the present I am working in the <a href="http://www.cso.cz/" target="_blank">Czech Society for Ornithology</a> as a programmer. I am interested in 3D graphics and games on the web (<a href="http://webappgames.com/" target="_blank">WebAppGames.com</a>). I also created a board game Towers. Sometimes i <a href="#articles" >talk about my activities or write an article</a>.
                    </div>


                </article>





                <h2>{stateJS.value}</h2>
                <input type="text" value={stateJS.value} onChange={(event)=>store.dispatch({type:'CHANGE_VALUE',value:event.target.value})}/>
                <input type="color" value={stateJS.value} onChange={(event)=>store.dispatch({type:'CHANGE_VALUE',value:event.target.value})}/>



                <select value={stateJS.filters.status} onChange={(event)=>store.dispatch({type:'CHANGE_FILTER',filter:'status',value:event.target.value})}>

                    <option value="working">Pracuje</option>
                    <option value="done">Hotovo</option>

                </select>




                <div>

                    {content.items.filter((item)=>{


                        for(let filteredKey in stateJS.filters){
                            let filteredValue = stateJS.filters[filteredKey];

                            if(item[filteredKey]!==filteredValue){
                                return false;
                            }

                        }
                        return true;


                    }).map((item)=>{


                        return <PersonalWebItem key={item.id} store={store} item={item}/>
                    }

                    )}

                </div>




            </div>
    );

}
