import React, { useState } from 'react';

const Picture = (props) => {
    const [fontOptions, setFontOptions] = useState({fontFamily: 'Arial', fontWeight: '500', fontSize: '12px'})
   
    return (
        <section className="picture_modal" style={{...fontOptions}} onClick={ e => e.stopPropagation()}>
            <img src={props.entry.media} className="preview_insta_image" alt="" />
            <section style={{width: '19%'}}>
                <h1 className="preview_headline">{props.entry.headline}</h1>
                <p className="picture_text">{props.entry.text}</p>
            </section>
            <p className="close_entry_modal" 
                onClick={ () => {
                    document.querySelector('.entry_modal').style.display = 'none'
                    props.setShowEntry(false)
                }}>
                    Stäng
            </p>
        </section>
    )
}

export default Picture