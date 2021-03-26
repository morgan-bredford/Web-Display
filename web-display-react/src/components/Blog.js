import React, { useState } from 'react';

const Blog = (props) => {

    return (
        <div className="blog_modal" 
            style={{...props.entry.font_options}} 
            onClick={e => e.stopPropagation()}
        >
            <section>
                <h1 className="headline">{props.entry.headline}</h1>
                <img src={props.entry.media} className="blog_image" alt=""/>
                <p >{props.entry.text}</p>
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

Blog.displayName = 'Blogg'

export default Blog