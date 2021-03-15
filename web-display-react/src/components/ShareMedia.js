import { useState } from "react"
import React from 'react'
import axios from 'axios'
import '../css/sharemedia.css'
import Alt1 from "./Alt1"


const ShareMedia = () => {
    const [alt, setAlt] = useState('')

    const uploadMedia = (files) => {
        const formdata = new FormData()
        formdata.append("file", files[0])
        formdata.append("upload_preset", "e9az7d5v")
        console.log(formdata)

        axios.post("https://api.cloudinary.com/v1_1/dhusv2stv/image/upload", formdata)
        //.then( res => console.log(res.data.url) )
        .then( res => {
            document.getElementById('uploaded_media').src = res.data.url
            document.getElementById('uploaded_media').style.display = 'flex'
            document.getElementById('upload_media_label').style.display = 'none'
        })
        .catch( err => console.log(err) )
    }

    return(
        <>
        <main>
            <div className="share_media">
                {!alt ?
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
                    :
                    <div>
                        <Alt1 uploadMedia={uploadMedia} />
                    </div>
                }
            </div>
        </main>
        </>
    )
}

export default ShareMedia