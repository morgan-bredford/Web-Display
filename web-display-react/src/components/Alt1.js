import React, { useState } from 'react';
import FontOptions from './FontOptions';

const Alt1 = (props) => {
    const [fontOptions, setFontOptions] = useState({fontFamily: 'Arial', fontWeight: '500', fontSize: '12px'})

    const changeFont = () => {
        // // document.getElementById('t1').style.fontWeight = 'bold'
        // //setFontOptions({fontWeight: '700'})
        // setFontOptions({...fontOptions, e})
        // console.log(e)
    }

    return(
        <div id="alt1">
            <section className="alt1_section">
                <section className="blog_text_container">
                    <FontOptions fontOptions={fontOptions} setFontOptions={setFontOptions}/>
                    <textarea className="blogtext" style={fontOptions}></textarea>
                </section>
            </section>
            <section className="alt1_section">
                <img src="" id="uploaded_media" alt="" />
                <label htmlFor="upload_media" id="upload_media_label">Tryck för att ladda upp bild</label>
                <input type="file" id="upload_media" onChange={ e => props.uploadMedia(e.target.files) } />
            </section>
        </div>
    )
}

export default Alt1