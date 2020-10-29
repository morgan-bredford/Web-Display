import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import imagesearch from './imagesearch'
import './css/SearchImages.css'

function Gallery(props){
    const [gallery_images,setGalleryImages] = useState([])
    const [large_image,setLargeImage] = useState("")
    const [image_index,setImageIndex] = useState(-1)
    const [loading,setLoading] = useState(false)

    useEffect( () => {
        if(props.user && props.user[0]){
            setGalleryImages(props.user[0].galleryimages)
        }else if(sessionStorage.getItem('imagearray')){
            setGalleryImages(JSON.parse(sessionStorage.getItem('imagearray')))
            console.log(props.location.savedImages)
        }
            document.querySelector('nav').style.backgroundImage = 'url(/images/framebwclip.png)'
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
                                imageNav(e,-1)}}
                                 >{"<-"}</span>
                        : null
                    }
                    <div id="lbimgcontainer">
                        <img src={large_image} className="lbimg" onLoad={() => setLoading(false)} onClick={(e) => {
                            e.stopPropagation() }}/>
                        {loading ? <span id="lbload" >loading...</span> : null}
                        <span id="lbclose" onClick={(e) => setLargeImage("")
                    } >
                            X</span>
                    </div>
                    {
                        gallery_images.findIndex(img => img.largeImageURL === large_image) + 1 < gallery_images.length ?  
                            <span className="lbnav" onClick={(e) => {
                                setLoading(true)
                                imageNav(e,1)}}>{"->"}</span>
                        : null
                    }
                </div>
                : null
                }
            { gallery_images.length ? gallery_images.map(image => {
                return (
                    <span>
                    <img src={image.previewURL} id={image.id} onClick={() => {
                        setLoading(true)
                        setLargeImage(image.largeImageURL)
                        }} />
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
