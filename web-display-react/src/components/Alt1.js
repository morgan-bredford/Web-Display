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
                <section className="choose_media_container">
                    <img src="" id="chosen_media" alt="" />
                    <label htmlFor="choose_upload_pic" className="pic_source_choice" id="choose_upload_pic_label">Tryck för att ladda upp bild</label>
                    <input type="file" className="pic_source_input" id="choose_upload_pic" onChange={ e => props.uploadMedia(e.target.files) } />
                    <div className="pic_source_choice" id="choose_gallery_pic_label" onClick={ () => document.getElementById('choose_gallery_pic_container').style.display = 'unset' }>Välj bild från ditt galleri</div>
                    <label htmlFor="choose_link_pic" className="pic_source_choice" id="choose_link_pic_label">Klistra in länk till bild</label>
                    <input type="file" className="pic_source_input" id="choose_link_pic" onChange={ e => props.uploadMedia(e.target.files) } />
                    <section id="choose_gallery_pic_container">
                    { 
                        props.gallery_images.length ? props.gallery_images.map(image => {
                            return (
                                <span onClick={ () => props.chooseGalleryPic(image.largeImageURL) }>
                                {/* // onClick={() => {
                                //     setLoading(true)
                                //     setLargeImage(image.largeImageURL)
                                //     }}> */}
                                    <img className="prev_card_img" src={image.previewURL} id={image.id}  />
                                </span >
                            )
                        })
                        : <div>Ditt galleri är förvärvarande tomt, gå till 'Bygg galleri' för att lägga till bilder</div>
                    }
                    </section>
                </section>
            </section>
        </div>
    )
}

export default Alt1