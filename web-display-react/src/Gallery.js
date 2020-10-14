import React, {useState,useEffect} from "react";
import {Link} from 'react-router-dom'
import imagesearch from './imagesearch'


//let gallery_images = [{id:1149841,previewURL:"https://cdn.pixabay.com/photo/2016/01/19/17/41/friends-1149841_150.jpg"}]

function Gallery(){
    const [gallery_images,setGalleryImages] = useState([])

    useEffect( () => {
        if(sessionStorage.getItem('imagearray')){
        setGalleryImages(JSON.parse(sessionStorage.getItem('imagearray')))
        console.log('render')}
        },[])


    return(
        <div className='imagecontainer'>
                {gallery_images.map(image =>
                <span>
                    <Link to={`/imagesearch/`}>
                    <img src={image.previewURL} id={image.id}/>
                    </Link>
                </span>       
                )}
        </div>
    )
}
export default Gallery;
