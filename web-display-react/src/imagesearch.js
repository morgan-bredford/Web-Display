import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LargeImage from "./LargeImage";
import SearchImages from "./SearchImages";
import App3 from "./App3";

function ImageSearch() {
  const URL = "https://pixabay.com/api";
  const apikey = "18623126-9e0d07d5ea60888b927459e25";
  const [searchimages, setSearchimages] = useState([]);
  const [savedimages,setSavedimages] = useState([]);
  const [pic, setPic] = useState("");
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)

  useEffect( () => {
    if(sessionStorage.getItem('imagearray')){
      setSavedimages(JSON.parse(sessionStorage.getItem('imagearray')))
    }else{
      sessionStorage.setItem('imagearray',"[]")
    }
    upimg()
   },[])

  useEffect( () => {
    getCoords()
    savedimages.map(image => {
      document.getElementById(image.id).addEventListener("mousedown", dragStart, false);
      document.getElementById(image.id).addEventListener("mousemove", drag, false);
      document.getElementById(image.id).addEventListener("mouseup", dragEnd, false);
      }
    )
    console.log('update')
  },[savedimages])

  const handleSubmit = (e,query,page) => {
    e.preventDefault();
    setQuery(e.target.searchbox.value)
    // axios
    //   .get(`${URL}?key=${apikey}&q=${query}&per_page=5&page=${page}`)
    //   .then((res) => setSearchimages(res.data.hits))
    //   .catch((err) => console.log(err));
  };

  const addImage = (e,image) => {
    const {id,previewURL,largeImageURL} = image
    const imageobj = {id,previewURL, largeImageURL}
    const newimagearray = [...(JSON.parse(sessionStorage.getItem('imagearray'))),imageobj]
    sessionStorage.setItem('imagearray',JSON.stringify(newimagearray))
    setSavedimages(newimagearray)
  }

  const removeImage = (image_id) => {
    const newimagearray = savedimages.filter(
      (image) => image.id !== image_id
    )
    sessionStorage.setItem('imagearray',JSON.stringify(newimagearray))
    setSavedimages(newimagearray)
  }

  const getCoords =  () => {
    savedimages.map( image => {
        const obj = document.getElementById(image.id)
        image.coords = findPos(obj)
        image.coordsoffset = {xoff: 0, yoff: 0}
      }
    )
  }

  const findPos = (obj) => {
    if(obj){
      let curleft = 0
      let curtop = 0;
      if (obj.offsetParent) {
        do {
          curleft += obj.offsetLeft;
          curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return {x:curleft,y:curtop}
        console.log([curleft,curtop])
      }
    }
  }

  let active = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let dragItem

  function dragStart(e) {
    dragItem = document.getElementById(e.target.id)

    if (e.type === "touchstart") {
      initialX = e.touches[0].clientX
      initialY = e.touches[0].clientY
    } else {
      initialX = e.clientX
      initialY = e.clientY
    }

    if (e.target === dragItem) {
      active = true;
    }
  }

  function drag(e) {
    if (active) {
      e.preventDefault();
    
      if (e.type === "touchmove") {
        currentX = e.touches[0].clientX - initialX;
        currentY = e.touches[0].clientY - initialY;
      } else {
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
      }

      savedimages.map( image => { 
        if(e.target.id == image.id){
          currentX += image.coordsoffset.xoff
          currentY += image.coordsoffset.yoff
        }
      })

      setTranslate(currentX, currentY, dragItem)
    }
  }

  function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
  }

  function dragEnd(e) {
    let sendimage = {}
    savedimages.map( image => { 
      if(e.target.id == image.id){
        image.coords.x = image.coords.x + currentX
        image.coords.y = image.coords.y + currentY
        image.coordsoffset.xoff = currentX
        image.coordsoffset.yoff = currentY
        sendimage = image
      }
    })

    active = false;
    document.removeEventListener("mousemove", drag, false);
    
    console.log(`c:${currentX} o:${e.clientX} i:${initialX}`)
    console.log(`c:${currentY} o:${e.clientY} i:${initialY}`)
    moveImage(sendimage)
  }

const moveImage = (moveimage) => {
  const temparray = []
  savedimages.map(
    image => {
      if(image.id !== moveimage.id){
        if(image.coords.x < moveimage.coords.x){
          temparray.push(image)
        } else if (moveimage.coords.y <= (image.coords.y + 50) && (moveimage.coords.y >= image.coords.y - 50)){
          temparray.push(moveimage)
          temparray.push(image)
          moveimage.coords = {x:99999,y:99999}
        } else {
          temparray.push(image)
        }
      }
    }
  )
  if(temparray.length === savedimages.length){
    console.log('true')
    sessionStorage.setItem('imagearray',JSON.stringify(temparray))
    setSavedimages(temparray)
    window.location.reload(false)
  }else{
    window.location.reload(false)
  }
}

const upimg = () => {
  document.querySelector('input[type="file"]').addEventListener('change', function() {
    if (this.files && this.files[0]) {
        var img = document.querySelector('img');  // $('img')[0]
  console.log(img)
        // img.src = URL.createObjectURL(this.files[0]); // set src to blob url
        // img.onload = this.imageIsLoaded;
    }
  });
}

  return (
    <main>
      <div >
            <input type='file' />
            <img id="myImg" src="#" alt="your image" /><br />
        </div>
      <SearchImages setSavedimages={setSavedimages} page={page} setPage={setPage} />
      <br />
      <div className='imagecontainer'>
        {savedimages.map(image =>
          <span>
            <Link to={`/imagesearch/`}>
            <img src={image.previewURL} id={image.id}/>
            </Link>
            <span  onClick={ () => removeImage(image.id) } >X</span>
          </span>       
        )}
      </div>
    <Link to={{pathname: "/gallery",
      savedImages:{savedimages}}}>
      <h2>Gå till Gallery</h2>
    </Link>
    </main>
  );
}

export default ImageSearch;
