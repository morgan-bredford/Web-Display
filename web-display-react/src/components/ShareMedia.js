import { useState, useEffect } from "react"
import React from 'react'
import axios from 'axios'
import '../css/sharemedia.css'
import Alt1 from "./Alt1"
import Insta from "./Insta"
import Utube from "./Utube"


const ShareMedia = () => {
    const [alt, setAlt] = useState('')
    const [gallery_images,setGalleryImages] = useState([])
    const [preview, setPreview] = useState({headline: "",text: "", media: ""})

    useEffect( () => {
        if(sessionStorage.getItem('imagearray')) setGalleryImages(JSON.parse(sessionStorage.getItem('imagearray')))
    },[]) 

    const uploadMedia = (files) => {
        const formdata = new FormData()
        formdata.append("file", files[0])
        formdata.append("upload_preset", "e9az7d5v")
        console.log(formdata)

        axios.post("https://api.cloudinary.com/v1_1/dhusv2stv/image/upload", formdata)
        //.then( res => console.log(res.data.url) )
        .then( res => {
            document.getElementById('chosen_media').src = res.data.url
            document.getElementById('chosen_media').style.display = 'flex'
            //document.getElementById('choose_media_container').style.display = 'none'
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
    }

    return(
        <>
        <main>
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
                            <Alt1 uploadMedia={uploadMedia} chooseGalleryPic={chooseGalleryPic} gallery_images={gallery_images} preview={preview} previewHandler={previewHandler}/>
                        :  alt === 'alt2'
                            ?
                            <Insta uploadMedia={uploadMedia} chooseGalleryPic={chooseGalleryPic} gallery_images={gallery_images} preview={preview} previewHandler={previewHandler}/> 
                            : <Utube uploadMedia={uploadMedia} chooseGalleryPic={chooseGalleryPic} gallery_images={gallery_images} preview={preview} previewHandler={previewHandler}/>
                }
            </div>
        </main>
        </>
    )
}

export default ShareMedia