import React, { useState } from 'react';

const Picture = (props) => {
   
    return (
        <section className="picture_modal" style={{...props.entry.font_options}} onClick={ e => e.stopPropagation()}>
            <img src={props.entry.media} className="picture_image" alt="" />
            <section className="picture_text_container">
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