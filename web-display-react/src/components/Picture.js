import React, { useState } from 'react';

const Picture = (props) => {
    const [fontOptions, setFontOptions] = useState({fontFamily: 'Arial', fontWeight: '500', fontSize: '12px'})
   
    return (
        <div className="entry_modal" style={{...fontOptions,display: 'flex',position: 'absolute',width: `clamp(400px,${props.entry.text.length}px / 2,80vw)`}}>
            <section>
                <img src={props.entry.media} className="preview_blog_image" alt="" />
                <p>{props.entry.text}</p>
                <h1 className="preview_headline">{props.entry.headline}</h1>
                <p>ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ</p>
            </section>
        </div>
    )
}

export default Picture