import { useState } from "react"
import React from 'react'
import axios from 'axios'
import '../css/sharemedia.css'


const ShareMedia = () => {
    const [alt, setAlt] = useState('')

    const uploadMedia = (files) => {
        const formdata = new FormData()
        formdata.append("file", files[0])
        formdata.append("upload_preset", "e9az7d5v")
        console.log(formdata)

        axios.post("https://api.cloudinary.com/v1_1/dhusv2stv/image/upload", formdata)
        .then( res => console.log(res) )
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
                        <p>du har valt {alt}</p>
                        <input type="file" onChange={ e => uploadMedia(e.target.files) } />
                    </div>
                }
            </div>
        </main>
        </>
    )
}

export default ShareMedia