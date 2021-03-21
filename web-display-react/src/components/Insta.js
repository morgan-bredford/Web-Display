import React, { useState } from 'react';
import FontOptions from './FontOptions';

const Insta = (props) => {
    const [fontOptions, setFontOptions] = useState({fontFamily: 'Arial', fontWeight: '500', fontSize: '12px'})
    

    const link = e => {
        e.preventDefault()
        props.chooseGalleryPic(e.target[0].value)
        document.getElementById('choose_link_pic_modal').style.display = 'none'
    }

    return(
        <div>
        <div className="alt">
            {/* Gallery Modal */}
            <section id="choose_gallery_pic_modal">
                <span onClick={() => document.getElementById('choose_gallery_pic_modal').style.display = 'none'}>
                    Avbryt X
                </span>
                { 
                    props.gallery_images.length ? props.gallery_images.map(image => {
                        return (
                            <span onClick={ 
                                () => {
                                    props.chooseGalleryPic(image.largeImageURL)
                                    document.getElementById('choose_gallery_pic_modal').style.display = 'none' 
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
            {/* Upload Media section */}
            <section className="media_section" style={{width: '74%'}}>
                <section className="chosen_media_container">
                    <img src="" id="chosen_media" alt="" />
                    <span id="chosen_media_delete" onClick={() => document.querySelector('.chosen_media_container').style.display = 'none'}>Byt bild</span>
                </section>
                <section id="choose_media_container">
                    <label htmlFor="choose_upload_pic" className="pic_source_choice" id="choose_upload_pic_label">Klicka här för att ladda upp bild</label>
                    <input type="file" className="pic_source_input" id="choose_upload_pic" onChange={ e => props.uploadMedia(e.target.files) } />
                    <div className="pic_source_choice" id="choose_gallery_pic_label" onClick={ () => document.getElementById('choose_gallery_pic_modal').style.display = 'flex' }>
                        Välj bild från ditt galleri
                    </div>
                    <div className="pic_source_choice" id="choose_link_pic_label" onClick={ () => document.getElementById('choose_link_pic_modal').style.display = 'flex' }>
                        Klistra in länk till bild
                    </div>
               </section> 
            </section>
            {/* BlogText section */}
            <section className="text_section" style={{width: '24%'}}>
                <section className="blog_text_container">
                    <FontOptions fontOptions={fontOptions} setFontOptions={setFontOptions}/>
                    <input type="text" className="headline_input" placeholder="Rubrik (valfritt)" onChange={ e => props.previewHandler({headline: e.target.value}) } />
                    <textarea className="blogtext" style={fontOptions} onChange={ e => props.previewHandler({text: e.target.value}) }></textarea>
                </section>
            </section>
            {/* Preview Modal */}
            <section className="preview_modal"   onClick={ e => {
                    e.stopPropagation()
                    document.querySelector('.preview_modal').style.display = 'none'
                }}>
                <div className="preview" style={{...fontOptions}}>
                    <section style={{display: 'flex',gap: '1em'}}>
                        <img src={props.preview.media} className="preview_insta_image" alt="" />
                        <section style={{width: '19%'}}>
                            <h1 className="preview_headline">{props.preview.headline}</h1>
                            <p>{props.preview.text}</p>
                        </section>
                    </section>
                    <div>
                    <span className="preview_button" onClick={() => document.querySelector('.preview_modal').style.display = 'none'}>
                            Avbryt
                        </span>
                        <span className="preview_button" onClick={ () => props.publishEntry('insta') }>
                            Publicera
                        </span>
                    </div>
                </div>
            </section>
        </div>
            <div className="preview_button" onClick={() => document.querySelector('.preview_modal').style.display = 'block'}>
                Förhandsgranska
            </div>
            <span className="preview_button" onClick={() => document.querySelector('.share_media').style.display = 'none'}>
                Avbryt
            </span>
        </div>
    )
}

export default Insta