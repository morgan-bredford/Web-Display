import React, { useState } from 'react';

const Blog = (props) => {

    return (
        <div className="blog_modal" 
            style={{...props.entry.font_options,display: 'flex',width: `clamp(400px,${props.entry.text.length}px / 2,80vw)`}} 
            onClick={e => e.stopPropagation()}
        >
            <section>
                <h1 className="preview_headline">{props.entry.headline}</h1>
                <img src={props.entry.media} className="preview_blog_image" alt="" style={{width: `clamp(100px,${props.entry.text.length}px / 5,20vw)`}}/>
                <p>{props.entry.text}</p>
            </section>
            <p className="close_entry_modal" 
                onClick={ () => {
                    document.querySelector('.entry_modal').style.display = 'none'
                    props.setShowEntry(false)
                }}>
                    Stäng
            </p>
        </div>
    )
}

export default Blog