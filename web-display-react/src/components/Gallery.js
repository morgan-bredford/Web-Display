import React, { useState, useEffect } from "react";
import '../css/searchimages.css'

function Gallery(props){
    const [gallery_images,setGalleryImages] = useState([])
    const [large_image,setLargeImage] = useState("")
    const [loading,setLoading] = useState(false)

    // Sets the gallery image array depending if the user is logged in
    useEffect( () => {
        // If the user is logged in get the image array from the user object
        if(props.loggedIn){
            console.log(props.user)
            setGalleryImages(props.user.galleryimages)
        }
        // If the user is not logged in get the image array from session storage
        else if(sessionStorage.getItem('imagearray')){
                setGalleryImages(JSON.parse(sessionStorage.getItem('imagearray')))
        }
    },[])

    //Navigation of which image shows in the lightbox, moves to next or previous in the gallery array 
    const imageNav = (e,nav_index) => { 
        e.stopPropagation()  
        const index = gallery_images.findIndex(img => img.largeImageURL === large_image) + nav_index
        if(index > -1 && index < gallery_images.length){
            setLargeImage(
            gallery_images[(gallery_images.findIndex(img => img.largeImageURL === large_image)) + nav_index]
            .largeImageURL)
        }
    }

    // Creates the date string thats added to the image object when saved in the gallery
    const getSaveDate = img => {
        const date = new Date(img.time)
        const options = {  
            year: "numeric", month: "short",  
            day: "numeric", hour12: false, hour: "2-digit", minute: "2-digit"  
        };
        return date.toLocaleTimeString("en-us", options)
    }

    return(
        <main>
        <br /><br /><br />
        <div className='imagecontainer'>
            {
                // Opens the lightbox if an image in the gallery has been clicked 
                large_image ?
                    <div id="lightbox" onClick={(e) => setLargeImage("") }>
                        {
                            gallery_images.findIndex(img => img.largeImageURL === large_image) !== 0 ?  
                                <span className="lbnav" onClick={(e) => {
                                        setLoading(true)
                                        imageNav(e,-1)
                                        }}
                                    ><img src="/images/backward_arrow.svg" className="arrow" alt="arrow"/></span>
                            : null
                        }
                        <div id="lbimgcontainer">
                            <img src={large_image} className="lbimg" onLoad={() => setLoading(false)} onClick={(e) => e.stopPropagation() } alt=""/>
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
                                ><img src="/images/forward_arrow.svg" className="arrow" alt="arrow"/></span>
                            : null
                        }
                    </div>
                : null
                }
            { 
                gallery_images.length ? gallery_images.map(image => {
                    return (
                        <span className="prev_card" onClick={() => {
                            setLoading(true)
                            setLargeImage(image.largeImageURL)
                            }}>
                            <img className="prev_card_img" src={image.previewURL} id={image.id}  alt="" />
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
        </main>
    )
}
export default Gallery;
