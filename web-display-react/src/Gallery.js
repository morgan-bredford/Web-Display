import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import BuildGallery from './BuildGallery'
import './css/searchimages.css'

function Gallery(props){
    const [gallery_images,setGalleryImages] = useState([])
    const [large_image,setLargeImage] = useState("")
    const [image_index,setImageIndex] = useState(-1)
    const [loading,setLoading] = useState(false)

    useEffect( () => {
        if(props.loggedIn){
            setGalleryImages(props.user[0].galleryimages)
        }else if(sessionStorage.getItem('imagearray')){
                setGalleryImages(JSON.parse(sessionStorage.getItem('imagearray')))
        }
    },[])

    const imageNav = (e,nav_index) => { 
        e.stopPropagation()  
        const index = gallery_images.findIndex(img => img.largeImageURL === large_image) + nav_index
        if(index > -1 && index < gallery_images.length){
            setLargeImage(
            gallery_images[(gallery_images.findIndex(img => img.largeImageURL === large_image)) + nav_index]
            .largeImageURL)
        }
    }
    const getSaveDate = img => {
        const date = new Date(img.time)
        const options = {  
            year: "numeric", month: "short",  
            day: "numeric", hour12: false, hour: "2-digit", minute: "2-digit"  
        };
        return date.toLocaleTimeString("en-us", options)
    }

    return(
        <React.Fragment>
        <br /><br /><br />
        <div className='imagecontainer'>
            {
                large_image ?
                    <div id="lightbox" onClick={(e) => setLargeImage("") }>
                        {
                            gallery_images.findIndex(img => img.largeImageURL === large_image) !== 0 ?  
                                <span className="lbnav" onClick={(e) => {
                                        setLoading(true)
                                        imageNav(e,-1)
                                        }}
                                    >{"<-"}</span>
                            : null
                        }
                        <div id="lbimgcontainer">
                            <img src={large_image} className="lbimg" onLoad={() => setLoading(false)} onClick={(e) => e.stopPropagation() }/>
                            {
                                loading ? <span id="lbload" >loading...</span> : null
                            }
                            <span id="lbclose" onClick={(e) => setLargeImage("")} >X</span>
                        </div>
                        {
                            gallery_images.findIndex(img => img.largeImageURL === large_image) + 1 < gallery_images.length ?  
                                <span className="lbnav" onClick={(e) => {
                                    setLoading(true)
                                    imageNav(e,1)
                                }}
                                >{"->"}</span>
                            : null
                        }
                    </div>
                : null
                }
            { 
                gallery_images.length ? gallery_images.map(image => {
                    return (
                        <span className="prev_card" >
                            <img className="prev_card_img" src={image.previewURL} id={image.id} onClick={() => {
                                setLoading(true)
                                setLargeImage(image.largeImageURL)
                                }} />
                            <div className="prev_card_info">
                                Sökord: {image.query}<br />
                                Sparad: {getSaveDate(image)} 
                                
                            </div>
                        </span >
                    )
                })
                : <div>Ditt galleri är förvärvarande tomt, gå till 'Bygg galleri' för att lägga till bilder</div>
            }
        </div>
        </React.Fragment>
    )
}
export default Gallery;
