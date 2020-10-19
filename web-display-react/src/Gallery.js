import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import imagesearch from './imagesearch'
import './SearchImages.css'

function Gallery(props){
    const [gallery_images,setGalleryImages] = useState([])
    const [large_image,setLargeImage] = useState("")
    const [image_index,setImageIndex] = useState(-1)

    useEffect( () => {
        if(sessionStorage.getItem('imagearray')){
        setGalleryImages(JSON.parse(sessionStorage.getItem('imagearray')))
        console.log(props.location.savedImages)}
        },[])

    const imageNav = (e,nav_index) => {
        e.stopPropagation()  
        const index = gallery_images.findIndex(img => img.largeImageURL === large_image) + nav_index
        console.log(index+" "+gallery_images.length)
        if(index > -1 && index < gallery_images.length){
            setLargeImage(
            gallery_images[(gallery_images.findIndex(img => img.largeImageURL === large_image)) + nav_index]
            .largeImageURL)
        }
    }

    return(
        <div className='imagecontainer'>
            {
                
                large_image ?
                <div id="lightbox" onClick={(e) => setLargeImage("") }>
                    {
                        gallery_images.findIndex(img => img.largeImageURL === large_image) !== 0 ?  
                            <span className="lbnav" onClick={(e) => imageNav(e,-1)} >back</span>
                        : null
                    }
                    <div id="lbimgcontainer">
                        <img src={large_image} className="lbimg" onClick={(e) => {
                            e.stopPropagation() }}/>
                        <span id="lbclose" onClick={(e) => setLargeImage("")
                    } >
                            X</span>
                    </div>
                    {
                        gallery_images.findIndex(img => img.largeImageURL === large_image) + 1 < gallery_images.length ?  
                            <span className="lbnav" onClick={(e) => imageNav(e,1)}>forward</span>
                        : null
                    }
                </div>
                : null
                }
            {gallery_images.map(image => {
                return (
                    <span>
                    <img src={image.previewURL} id={image.id} onClick={() => {
                        setLargeImage(image.largeImageURL)
                        }} />
                    </span >
                )
            }    
            )}
        </div>
    )
}
export default Gallery;
