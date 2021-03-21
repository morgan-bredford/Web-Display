import { useState, useEffect } from "react"
import React from 'react'
import axios from 'axios'
import '../css/sharemedia.css'
import Alt1 from "./Alt1"
import Insta from "./Insta"
import Utube from "./Utube"
import TestBlog from "./TestBlog"
import {Link} from 'react-router-dom'
import Picture from "./Picture"


const ShareMedia = () => {
    const [alt, setAlt] = useState()
    const [gallery_images,setGalleryImages] = useState([])
    const [preview, setPreview] = useState({headline: "",text: "", media: ""})
    const [ActiveEntry, setActiveEntry] = useState()
    const [showEntry, setShowEntry] = useState(false)
    let entry_array = [
        {
            entry_type: TestBlog,
            headline:'Headline1',
            text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis cursus, lacus in fringilla laoreet, nulla diam imperdiet sem, ac laoreet ex turpis vitae tellus. Donec in mi at sem suscipit pellentesque. Integer sed lorem interdum ligula placerat eleifend eu eu lorem. Nam non nisi nec neque tristique volutpat. Integer sed bibendum ipsum. Donec non pharetra ligula, luctus posuere nisi. Interdum et malesuada fames ac ante ipsum primis in faucibus.Sed efficitur ante risus, varius cursus neque mattis vitae. In hac habitasse platea dictumst. Proin quis interdum nibh, id efficitur nulla. Duis ornare interdum nibh ut tempus. Curabitur sit amet lacinia eros, at fermentum diam. Integer bibendum commodo porta. Sed condimentum nisl in elementum tempor. Sed vulputate quis enim sed malesuada. Vestibulum porta volutpat ipsum, et gravida nisi hendrerit faucibus. Etiam ac convallis dui, in feugiat elit. Suspendisse posuere consectetur augue, ac elementum metus pellentesque lobortis. Vivamus sagittis id orci vitae egestas. Praesent eleifend quis dolor sit amet vulputate.Aenean quis risus dui. Nulla ultrices magna et arcu dictum, at mollis erat feugiat. Quisque ut luctus neque, a interdum diam. Nunc efficitur, risus in fringilla interdum, arcu sem dictum purus, in accumsan erat ligula vel felis. Vivamus non nisi non mauris sagittis tempus ut id dolor. Ut eleifend sapien eget elit lobortis, lacinia aliquet erat euismod. Fusce aliquam ligula eu leo dapibus, vestibulum tincidunt mi consequat. Fusce magna tortor, feugiat quis quam sit amet, gravida facilisis libero.',
            media:'https://cdn.pixabay.com/photo/2017/10/13/14/15/fantasy-2847724_960_720.jpg',
            font_options: {fontFamily: 'Arial', fontWeight: '500', fontSize: '12px'}
        },
        {
            entry_type: Picture,
            headline:'Headline2',
            text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis cursus, lacus in fringilla laoreet, nulla diam imperdiet sem, ac laoreet ex turpis vitae tellus. Donec in mi at sem suscipit pellentesque. Integer sed lorem interdum ligula placerat eleifend eu eu lorem. Nam non nisi nec neque tristique volutpat. Integer sed bibendum ipsum. Donec non pharetra ligula, luctus posuere nisi. Interdum et malesuada fames ac ante ipsum primis in faucibus.Sed efficitur ante risus, varius cursus neque mattis vitae. In hac habitasse platea dictumst. Proin quis interdum nibh, id efficitur nulla. Duis ornare interdum nibh ut tempus. Curabitur sit amet lacinia eros, at fermentum diam. Integer bibendum commodo porta. Sed condimentum nisl in elementum tempor. Sed vulputate quis enim sed malesuada. Vestibulum porta volutpat ipsum, et gravida nisi hendrerit faucibus. Etiam ac convallis dui, in feugiat elit. Suspendisse posuere consectetur augue, ac elementum metus pellentesque lobortis. Vivamus sagittis id orci vitae egestas. Praesent eleifend quis dolor sit amet vulputate.Aenean quis risus dui. Nulla ultrices magna et arcu dictum, at mollis erat feugiat. Quisque ut luctus neque, a interdum diam. Nunc efficitur, risus in fringilla interdum, arcu sem dictum purus, in accumsan erat ligula vel felis. Vivamus non nisi non mauris sagittis tempus ut id dolor. Ut eleifend sapien eget elit lobortis, lacinia aliquet erat euismod. Fusce aliquam ligula eu leo dapibus, vestibulum tincidunt mi consequat. Fusce magna tortor, feugiat quis quam sit amet, gravida facilisis libero.',
            media:'https://cdn.pixabay.com/photo/2017/10/13/14/15/fantasy-2847724_960_720.jpg',
            font_options: {fontFamily: 'Arial', fontWeight: '500', fontSize: '12px'}
        },
        {
            entry_type: 'video',
            headline:'Headline3',
            text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis cursus, lacus in fringilla laoreet, nulla diam imperdiet sem, ac laoreet ex turpis vitae tellus. Donec in mi at sem suscipit pellentesque. Integer sed lorem interdum ligula placerat eleifend eu eu lorem. Nam non nisi nec neque tristique volutpat. Integer sed bibendum ipsum. Donec non pharetra ligula, luctus posuere nisi. Interdum et malesuada fames ac ante ipsum primis in faucibus.Sed efficitur ante risus, varius cursus neque mattis vitae. In hac habitasse platea dictumst. Proin quis interdum nibh, id efficitur nulla. Duis ornare interdum nibh ut tempus. Curabitur sit amet lacinia eros, at fermentum diam. Integer bibendum commodo porta. Sed condimentum nisl in elementum tempor. Sed vulputate quis enim sed malesuada. Vestibulum porta volutpat ipsum, et gravida nisi hendrerit faucibus. Etiam ac convallis dui, in feugiat elit. Suspendisse posuere consectetur augue, ac elementum metus pellentesque lobortis. Vivamus sagittis id orci vitae egestas. Praesent eleifend quis dolor sit amet vulputate.Aenean quis risus dui. Nulla ultrices magna et arcu dictum, at mollis erat feugiat. Quisque ut luctus neque, a interdum diam. Nunc efficitur, risus in fringilla interdum, arcu sem dictum purus, in accumsan erat ligula vel felis. Vivamus non nisi non mauris sagittis tempus ut id dolor. Ut eleifend sapien eget elit lobortis, lacinia aliquet erat euismod. Fusce aliquam ligula eu leo dapibus, vestibulum tincidunt mi consequat. Fusce magna tortor, feugiat quis quam sit amet, gravida facilisis libero.',
            media:'https://cdn.pixabay.com/photo/2017/10/13/14/15/fantasy-2847724_960_720.jpg',
            font_options: {fontFamily: 'Arial', fontWeight: '500', fontSize: '12px'}
        }
    ]
    
    
    const comps = {
        b: TestBlog,
        p: Picture
    }
    let SpEn

    useEffect( () => {
        if(sessionStorage.getItem('imagearray')) setGalleryImages(JSON.parse(sessionStorage.getItem('imagearray')))
        localStorage.setItem('entry_array',JSON.stringify(entry_array))
    },[]) 

    useEffect( () => console.log('render') )

    const uploadMedia = (files) => {
        const formdata = new FormData()
        formdata.append("file", files[0])
        formdata.append("upload_preset", "e9az7d5v")
        console.log(formdata)

        axios.post("https://api.cloudinary.com/v1_1/dhusv2stv/image/upload", formdata)
        .then( res => {
            document.getElementById('chosen_media').src = res.data.url
            document.getElementById('chosen_media').style.display = 'flex'
            document.querySelector('.chosen_media_container').style.display = 'unset'
            previewHandler({media: res.data.url})
        })
        .catch( err => console.log(err) )
    }

    const chooseGalleryPic = (url) => {
        document.getElementById('chosen_media').src = url
        document.querySelector('.chosen_media_container').style.display = 'unset'
        previewHandler({media: url})
    }

    const previewHandler = (p) => {
        setPreview({...preview, ...p})
        console.log(preview.text.length)
    }

    const publishEntry = (entry_type) => {
        const entry = {...preview, entry_type}
        localStorage.setItem('entry', JSON.stringify(entry))
        console.log(entry)
        document.querySelector('.share_media').style.display = 'none'
    }

    // const showEntry = () => {
    //     document.querySelector('.entry_modal').style.display = 'unset'
    // }

    return(
        <>
        <main>
            <Link to="/" ><button>dsf</button></Link>
            <button onClick={ () => document.querySelector('.share_media').style.display = 'flex' }>new entry</button>
            <section className="entry_container">
                {
                    entry_array.map( (entry, index) => {
                        return (
                        <div className="entry" id={index} onClick={ () => {
                            setActiveEntry(entry)
                            setShowEntry(true)
                            } 
                        }>
                            Entry
                        </div>)
                    })
                } 
            </section>
            { showEntry 
                ?<section className="entry_modal" 
                    onClick={( (e) => {
                        setShowEntry(false)
                    })} ><ActiveEntry.entry_type entry={ActiveEntry} /></section>
                : null 
            }
            {/* {
                localStorage.getItem('entry')
                ?
                    <section onClick={showEntry}>Entry</section>
                : null
            } */}
            <section className="new_entry_modal">
                <div className="share_media">
                {!alt 
                        ?
                            <div className="choose_media_look">
                                <p className="choose_media_look_choice" onClick={() => setAlt('alt1')}>
                                    1. alternativ
                                </p>
                                
                                <p className="choose_media_look_choice" onClick={() => setAlt('alt2')}>
                                    2. alternativ
                                </p>
                                
                                <p className="choose_media_look_choice" onClick={() => setAlt('alt3')}>
                                    3. alternativ
                                </p>
                            </div>
                        : alt === 'alt1'
                            ?
                                <Alt1 uploadMedia={uploadMedia} chooseGalleryPic={chooseGalleryPic} gallery_images={gallery_images} preview={preview} previewHandler={previewHandler} publishEntry={publishEntry}/>
                            :  alt === 'alt2'
                                ?
                                <Insta uploadMedia={uploadMedia} chooseGalleryPic={chooseGalleryPic} gallery_images={gallery_images} preview={preview} previewHandler={previewHandler} publishEntry={publishEntry}/> 
                                : <Utube uploadMedia={uploadMedia} chooseGalleryPic={chooseGalleryPic} gallery_images={gallery_images} preview={preview} previewHandler={previewHandler} publishEntry={publishEntry}/>
                    }
                </div>
            </section>
        </main>
        </>
    )
}

export default ShareMedia