import { useState, useEffect } from "react"
import React from 'react'
import axios from 'axios'
import '../css/sharemedia.css'
import WPress from "./WPress"
import Insta from "./Insta"
import Utube from "./Utube"
import Blog from "./Blog"
import Picture from "./Picture"
import Video from "./Video"


const ShareMedia = () => {
    const [alt, setAlt] = useState()
    const [gallery_images,setGalleryImages] = useState([])
    const [preview, setPreview] = useState({headline: "",text: "", media: "",background: '',font_options: {fontFamily: 'Arial', fontWeight: '500', fontSize: '12px'} })
    const [ActiveEntry, setActiveEntry] = useState()
    const [showEntry, setShowEntry] = useState(false)
    const [entryArray, setEntryArray] = useState([
        {
            entry_type: Blog,
            headline:'Headline1',
            text: 'Blogg exempel blogg exempel oo blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg oo exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel oo blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg oo exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg oo exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel oo blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel',
            media:'https://cdn.pixabay.com/photo/2017/10/13/14/15/fantasy-2847724_960_720.jpg',
            background: 'rgb(150, 52, 230)',
            font_options: {fontFamily: 'Arial', fontWeight: '500', fontSize: '12px'}
        },
        {
            entry_type: Picture,
            headline:'Headline2',
            text:'Foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel',
            media:'https://cdn.pixabay.com/photo/2017/10/13/14/15/fantasy-2847724_960_720.jpg',
            background: 'rgb(39, 51, 224)',
            font_options: {fontFamily: 'Arial', fontWeight: '500', fontSize: '24px'}
        },
        {
            entry_type: Video,
            headline:'Headline3',
            text:'Video exempel video exempel video exempel video exempel video exempel video exempel video exempel video exempel video exempel video exempel video exempel video exempel video exempel video exempel video exempel video exempel video exempel video exempel video exempel video exempel video exempel video exempel video exempel video exempel video exempel video exempel video exempel video exempel video exempel video exempel video exempel video exempel',
            media:'https://cdn.pixabay.com/photo/2017/10/13/14/15/fantasy-2847724_960_720.jpg',
            background: 'rgb(21, 80, 75)',
            font_options: {fontFamily: 'Arial', fontWeight: '500', fontSize: '36px'}
        }
    ])

    useEffect( () => {
        if(sessionStorage.getItem('imagearray')) setGalleryImages(JSON.parse(sessionStorage.getItem('imagearray')))
        localStorage.setItem('entry_array',JSON.stringify(entryArray))
    },[]) 

    //useEffect( () => console.log('render') )

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

    const chooseMedia = (media_choice) => {
        document.querySelector('.choose_new_entry_modal').style.display = 'none'
        setAlt(media_choice)
        setPreview({...preview,background: 'rgb(150, 52, 230)'})
        document.querySelector('.new_entry_modal').style.display = 'flex'
    }

    const chooseGalleryPic = (url) => {
        document.getElementById('chosen_media').src = url
        document.querySelector('.chosen_media_container').style.display = 'unset'
        previewHandler({media: url})
    }

    const previewHandler = (p) => {
        setPreview({...preview, ...p})
    }

    const publishEntry = (entry_type) => {
        const entry = {...preview, entry_type}
        document.querySelector('.choose_new_entry_modal').style.display = 'none'
        document.querySelector('.new_entry_modal').style.display = 'none'
        console.log(entry)
        setEntryArray([entry,...entryArray])
        console.log(entryArray)
        document.querySelector('.preview_modal').style.display = 'none'
        setAlt('')
        setPreview({headline: "",text: "", media: "",background: '',font_options: {fontFamily: 'Arial', fontWeight: '500', fontSize: '12px'} })
    }

    const mProps = {
        uploadMedia,
        chooseGalleryPic,
        gallery_images,
        preview,
        previewHandler,
        publishEntry,
        setAlt
    }

    return(
        <>
        <main>
            <button onClick={ () => document.querySelector('.choose_new_entry_modal').style.display = 'flex' }>new entry</button>
            <section className="entry_container">
                {
                    entryArray.map( (entry, index) => {
                        return (
                        <div className="entry" id={index} onClick={ () => {
                            setActiveEntry(entry)
                            setShowEntry(true)
                            } 
                        }>
                            <p className="entry_label" style={{backgroundColor: entry.background}}>
                                <p className="entry_label_text">{entry.entry_type.name}</p>
                            </p>
                            <p className="entry_preview" style={{...entry.font_options}}>
                                {entry.text}
                                <p className="entry_fade"></p>
                            </p>
                        </div>)
                    })
                }
            </section>
            { showEntry 
                ?<section className="entry_modal" 
                    onClick={( (e) => {
                        setShowEntry(false)
                    })} ><ActiveEntry.entry_type entry={ActiveEntry} setShowEntry={setShowEntry} /></section>
                : null 
            }
            <section className="choose_new_entry_modal" onClick={ () => document.querySelector('.choose_new_entry_modal').style.display = 'none' }>
                {!alt && <div className="choose_media_look" >
                        <p className="choose_media_look_choice" onClick={ () => chooseMedia('blog') }>
                            skapa blogg
                        </p>
                        
                        <p className="choose_media_look_choice" onClick={ () => chooseMedia('picture') }>
                            dela bild
                        </p>
                        <p className="choose_media_look_choice" onClick={ () => chooseMedia('video') }>
                            dela video
                        </p>
                    </div>
                }
            </section>
            <section className="new_entry_modal">
                { alt === 'blog'
                    ?
                        <WPress mProps={mProps} />
                    :  alt === 'picture'
                        ?
                        <Insta mProps={mProps}/> 
                        : <Utube mProps={mProps}/>
                }
            </section>
        </main>
        </>
    )
}

export default ShareMedia