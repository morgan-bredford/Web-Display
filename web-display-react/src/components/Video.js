import React, { useState } from 'react';
import ReactPlayer from 'react-player'

const Video = (props) => {
    const [fontOptions, setFontOptions] = useState({fontFamily: 'Arial', fontWeight: '500', fontSize: '12px'})

    return (
        <section className="video_container" onClick={ e => e.stopPropagation()}>
            <section style={{...props.entry.font_options,display: 'block',margin: 'auto' }}>
                {/* <img src={props.entry.media} className="video" alt="" /> */}
                <ReactPlayer url={props.entry.media} controls="true"/>
                <section style={{textAlign: 'center',overflow: 'scroll'}}>
                    <h1 className="preview_headline">{props.entry.headline}</h1>
                    <p style={{maxHeight: '10vh'}}>{props.entry.text}</p>
                </section>
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

export default Video