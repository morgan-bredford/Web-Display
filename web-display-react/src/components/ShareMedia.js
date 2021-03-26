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


const ShareMedia = (props) => {
    const [alt, setAlt] = useState()
    const [gallery_images,setGalleryImages] = useState([])
    const [preview, setPreview] = useState({headline: "",text: "", media: "",background: '',font_options: {fontFamily: 'Arial', fontWeight: '500', fontSize: '12px'}, save_date: '' })
    const [ActiveEntry, setActiveEntry] = useState()
    const [showEntry, setShowEntry] = useState(false)
    const [entryArray, setEntryArray] = useState([
        {
            entry_type: Blog,
            headline:'Headline1',
            text: 'Blogg exempel blogg exempel oo blogg exempel blogg exempel oo blogg exempel blogg exempel oo blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg oo exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel oo blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg oo exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg oo exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel oo blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel blogg exempel',
            media:'https://cdn.pixabay.com/photo/2017/10/13/14/15/fantasy-2847724_960_720.jpg',
            background: 'rgb(150, 52, 230)',
            font_options: {fontFamily: 'Arial', fontWeight: '500', fontSize: '14px'},
            save_date: 1616671086538
        },
        {
            entry_type: Picture,
            headline:'Headline2',
            text:'Foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel foto exempel',
            media:'https://cdn.pixabay.com/photo/2017/10/13/14/15/fantasy-2847724_960_720.jpg',
            background: 'rgb(39, 51, 224)',
            font_options: {fontFamily: 'Arial', fontWeight: '500', fontSize: '24px'},
            save_date: 1616671086538
        },
        {
            entry_type: Video,
            headline:'Headline3',
            text:'Video exempel video exempel video exempel video exempel video exempel video exempel video exempel video exempel',
            media:'https://youtu.be/HH9MQmMtilU',
            background: 'rgb(32, 143, 158)',
            font_options: {fontFamily: 'Arial', fontWeight: '500', fontSize: '36px'},
            save_date: 1616671086538
        }
    ])

    useEffect( () => {
        sessionStorage.setItem('x',Blog)
        // if(props.loggedIn){
        //     console.log(props.user)
        //     setEntryArray(props.user.entries)
        //     setGalleryImages(props.user.galleryimages)
        // }else{
        //     if(sessionStorage.getItem('entries')){
        //         setEntryArray(JSON.parse(sessionStorage.getItem('entries')))
        //     }else{
        //         sessionStorage.setItem('entries', JSON.stringify(entryArray))
        //     }
        //     if(sessionStorage.getItem('imagearray')) setGalleryImages(JSON.parse(sessionStorage.getItem('imagearray')))
        // }

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

    const publishEntry = (entry_type, background) => {
        const date = new Date()
        const entry = {...preview, entry_type, background, save_date: date.getTime()}
        addEntry(entry)
        document.querySelector('.choose_new_entry_modal').style.display = 'none'
        document.querySelector('.new_entry_modal').style.display = 'none'
        console.log(entry)
        setEntryArray([entry,...entryArray])
        console.log(entryArray)
        document.querySelector('.preview_modal').style.display = 'none'
        reset()
    }

    const reset = () => {
        setAlt('')
        setPreview({headline: "",text: "", media: "",background: '',font_options: {fontFamily: 'Arial', fontWeight: '500', fontSize: '14px'} })
        document.querySelector('.chosen_media_container').style.display = 'none'
    }
    
    // Creates the date string thats added to the entry object 
    const getSaveDate = entry => {
        const date = new Date(entry.save_date)
        return date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
    }

    const addEntry = (entry) => {
        console.log(entry)
        if(props.loggedIn)
        {
                const newentryarray = [entry,...props.user.entries]
                const user = {...props.user,entries: newentryarray}

                axios
                .post("http://127.0.0.1:8080/users/update",[user])
                .then((res) => {
                    props.setUser(user)
                    localStorage.setItem('user',JSON.stringify(user))
                })
                .catch(err => {
                   console.log(err.response)})

        }else{
                const newentryarray = [entry, ...(JSON.parse(sessionStorage.getItem('entries')))]
                sessionStorage.setItem('entries',JSON.stringify(newentryarray))
        }
      
        
    }

    const mProps = {
        chooseGalleryPic,
        gallery_images,
        preview,
        previewHandler,
        publishEntry,
        reset,
        setAlt,
        uploadMedia
    }

    return(
        <>
        <main>
            <section className="create_new_entry" onClick={ () => document.querySelector('.choose_new_entry_modal').style.display = 'flex' }>
                <img src="/images/new_entry.png" style={{width: '7vw', marginLeft: 'auto', marginRight: '3px', objectFit: 'contain'}}/>
                <p className="sn">
                    skapa nytt inlägg
                </p>
            </section>
            <section className="entry_container">
                { entryArray.length
                    ?
                    entryArray.map( (entry, index) => {
                        return (
                            <div className="entry" id={index} onClick={ () => {
                                setActiveEntry(entry)
                                setShowEntry(true)
                                } 
                            }>
                                <section className="entry_label" style={{backgroundColor: entry.background}}>
                                    <section className="entry_label_text_section">
                                        <p className="entry_label_text">{entry.entry_type.displayName}</p>
                                        <p className="entry_label_date">{getSaveDate(entry)}</p>
                                    </section>
                                </section>
                                <section className="entry_preview" style={{...entry.font_options}}>
                                    {entry.text}
                                    <p className="entry_fade"></p>
                                </section>
                            </div>
                        )
                    })
                    : <p>du har inga inlägg</p>
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
                    <section className="cursor" onClick={ () => chooseMedia('blog') }>
                        <img src="/images/blog.png" style={{width: '9vw', objectFit: 'contain'}}/>
                        <p className="choose_media_look_choice">
                            skapa blogg
                        </p>
                    </section>
                    <section  className="cursor" onClick={ () => chooseMedia('picture') }>
                        <img src="/images/picture.png" style={{width: '9vw', objectFit: 'contain'}}/>
                        <p className="choose_media_look_choice">
                            dela bild
                        </p>
                    </section>
                    <section  className="cursor" onClick={ () => chooseMedia('video') }>
                        <img src="/images/video.png" style={{width: '9vw', objectFit: 'contain'}}/>
                        <p className="choose_media_look_choice">
                            dela video
                        </p>
                    </section>
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