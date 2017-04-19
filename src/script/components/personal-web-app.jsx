

import * as React from "react";


import {translate,getMessage} from "../functions/translate.jsx";
import {PersonalWebItem} from "./personal-web-item.jsx";
import {PersonalWebItems} from "./personal-web-items.jsx";



export function PersonalWebAppComponent(props) {

    const {store, content} = props;
    const stateJS = store.getState().toJS();


    return (
            <div className="personal-web">



                <div className="languages">
                    {['en','cs'].map((language)=>
                        <img key={language} src={`/media/images/flags/${language}.png`} style={{boxShadow:language===stateJS.language?'black 0px 0px 5px':'none',opacity:language===stateJS.language?1:0.7,margin:3}} onClick={()=>store.dispatch({type:'CHANGE_LANGUAGE',language})}/>
                    )}
                </div>





                {stateJS.httpStatus===404?
                    <div className="special-page">

                        {translate(stateJS.language,'Not found :(')}


                    </div>
                :''}






                {!stateJS.opened_item_id?
                    <div>


                        <article className="about">
                            <div className="profile" itemScope itemType="http://schema.org/Person">

                                <img itemProp="image" src="http://1.gravatar.com/avatar/3d98c15957c5f5dd227e53dbc7cbb60d?s=300&r=pg&d=mm" className="avatar" alt="Pavol Hejný"/>
                                <h1 className="name" itemProp="name">{content.name}</h1>
                                <div className="subname" itemProp="jobTitle">{getMessage(stateJS.language,content.subname)}</div>

                            </div>



                            <div className="contacts">
                                <a href="mailto:me@pavolhejny.com" target="_blank"><i className="icon-envelope icons"/></a>
                                <a href="https://twitter.com/pavolhejny" target="_blank"><i className="icon-social-twitter icons"/></a>
                                <a href="https://www.facebook.com/hejny" target="_blank"><i className="icon-social-facebook icons"/></a>
                                <a href="https://www.linkedin.com/profile/view?id=AAMAABL-alkBCN2nJuDO_lhg0Pg0H47UcYbeYgM&trk=hp-identity-photo" target="_blank"><i className="icon-social-linkedin icons"/></a>
                                <a href="/media/data/pavol.hejny.vcf" target="_blank"><i className="icon-credit-card icons"/></a>

                            </div>




                            <div className="about_text" itemProp="description" dangerouslySetInnerHTML={{__html: getMessage(stateJS.language,content.about)}} />


                        </article>



                        <PersonalWebItems store={store} items={content.items}/>




                    </div>

                    :
                    <PersonalWebItem store={store} item={content.items.find((item)=>item.id===stateJS.opened_item_id)}/>
                }





                <div>
                    Nahoru
                </div>


                <footer>

                    &copy; Pavol Hejný


                    <ul>
                        <li>Kontakt</li>
                        <li>...</li>
                        <li>Zdrojoý kód</li>
                    </ul>
                </footer>




            </div>
    );

}
