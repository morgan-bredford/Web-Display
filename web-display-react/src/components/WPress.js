import React, { useState } from 'react';
import Blog from './Blog';
import FontOptions from './FontOptions';

const WPress = (props) => {
    
    const fontOptions = props.mProps.preview.font_options

    const link = e => {
        e.preventDefault()
        props.mProps.chooseGalleryPic(e.target[0].value)
        document.getElementById('choose_link_pic_modal').style.display = 'none'
    }

    return(
        <div>
            <div className="alt"  onClick={ e => e.stopPropagation() }>
                {/* Gallery Modal */}
                <section id="choose_gallery_pic_modal" onClick={ () => document.getElementById('choose_gallery_pic_modal').style.display = 'none'}>
                    <span onClick={() => document.getElementById('choose_gallery_pic_modal').style.display = 'none'}>
                        Avbryt X
                    </span>
                    { 
                        props.mProps.gallery_images.length ? props.mProps.gallery_images.map(image => {
                            return (
                                <span onClick={ 
                                    () => {
                                        props.mProps.chooseGalleryPic(image.largeImageURL)
                                    }
                                }>
                                    <img className="prev_card_img" src={image.previewURL} id={image.id}  />
                                </span >
                            )
                        })
                        : <div>Ditt galleri är förvärvarande tomt, gå till 'Bygg galleri' för att lägga till bilder</div>
                    }
                </section>
                {/* Link Modal */}
                <section id="choose_link_pic_modal">
                    <span onClick={() => document.getElementById('choose_link_pic_modal').style.display = 'none'}>
                            Avbryt X
                    </span>
                    <form onSubmit={ e => link(e)}>
                        Klistra in länk till bild:
                        <input type="text" />
                        <button>Sätt länk</button>
                    </form>
                </section>
                {/* BlogText section */}
                <section className="text_section" style={{width: '69%'}}>
                    <section className="blog_text_container">
                        <FontOptions preview={props.mProps.preview} previewHandler={props.mProps.previewHandler} />
                        <input type="text" className="headline_input" placeholder="Rubrik (valfritt)" onChange={ e => props.mProps.previewHandler({headline: e.target.value}) } />
                        <textarea className="blogtext" style={fontOptions} onChange={ e => props.mProps.previewHandler({text: e.target.value}) }></textarea>
                    </section>
                </section>
                {/* Upload Media section */}
                <section className="media_section" style={{width: '29%'}}>
                    <section className="chosen_media_container">
                        <img src="" id="chosen_media" alt="" />
                        <span id="chosen_media_delete" 
                            onClick={() => {
                                props.mProps.chooseGalleryPic('')
                                document.querySelector('.chosen_media_container').style.display = 'none'
                            }}>
                            Byt bild
                        </span>
                    </section>
                    <section id="choose_media_container">
                        <label htmlFor="choose_upload_pic" className="pic_source_choice" id="choose_upload_pic_label">Klicka här för att ladda upp bild</label>
                        <input type="file" className="pic_source_input" id="choose_upload_pic" onChange={ e => props.mProps.uploadMedia(e.target.files) } />
                        <div className="pic_source_choice" id="choose_gallery_pic_label" onClick={ () => document.getElementById('choose_gallery_pic_modal').style.display = 'flex' }>
                            Välj bild från ditt galleri
                        </div>
                        <div className="pic_source_choice" id="choose_link_pic_label" onClick={ () => document.getElementById('choose_link_pic_modal').style.display = 'flex' }>
                            Klistra in länk till bild
                        </div>
                </section> 
                </section>
                {/* Preview Modal */}
                <section className="preview_modal"  onClick={ e => {
                        e.stopPropagation()
                        document.querySelector('.preview_modal').style.display = 'none'
                    } 
                }>
                    <div className="preview" style={{...fontOptions,width: 'clamp(400px,max-content,70vw)'}} onClick={ e => e.stopPropagation()}>
                        <section style={{}}>
                            <h1 className="preview_headline">{props.mProps.preview.headline}</h1>
                            <img src={props.mProps.preview.media} className="preview_blog_image" alt="" style={{width: `clamp(100px,20vw,20vw)`}} />
                            <p>{props.mProps.preview.text}</p>
                        </section>
                        <div>
                            <span className="preview_button" onClick={ () => props.mProps.publishEntry(Blog) }>
                                Publicera
                            </span>
                            <span className="preview_button" onClick={() => document.querySelector('.preview_modal').style.display = 'none'}>
                                Avbryt
                            </span>
                        </div>
                    </div>
                </section>
            </div>
            <section  className="preview_button_container">
                <span className="preview_button" onClick={() => document.querySelector('.preview_modal').style.display = 'flex'}>
                    Förhandsgranska
                </span>
                <span className="preview_button" 
                    onClick={() => {
                        document.querySelector('.new_entry_modal').style.display = 'none'
                        props.mProps.setAlt('')
                        }}
                    >
                    Avbryt
                </span>
            </section>
        </div>
    )
}

export default WPress