import React, { useState } from 'react';
import ReactPlayer from 'react-player'

const Video = (props) => {
    const [fontOptions, setFontOptions] = useState({fontFamily: 'Arial', fontWeight: '500', fontSize: '12px'})

    return (
        <section className="video_container" onClick={ e => e.stopPropagation()}>
            <section>
                <div style={{width: 'max-content',margin: 'auto'}}>
                    <ReactPlayer url={props.entry.media} width="76vw" height="56vh" controls="true"/>
                </div>
                <section className="video_text_section" style={{...props.entry.font_options}}>
                    <h1 className="headline">{props.entry.headline}</h1>
                    <p className="video_text">{props.entry.text}</p>
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