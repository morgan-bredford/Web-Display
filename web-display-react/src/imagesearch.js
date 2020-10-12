import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LargeImage from "./LargeImage";

function ImageSearch() {
  const URL = "https://pixabay.com/api";
  const apikey = "18623126-9e0d07d5ea60888b927459e25";
  const [searchimages, setSearchimages] = useState([]);
  const [savedimages,setSavedimages] = useState([]);
  const [pic, setPic] = useState("");

  useEffect( () => {
    if(sessionStorage.getItem('imagearray')){setSavedimages(JSON.parse(sessionStorage.getItem('imagearray')))}
    
  },[])

  useEffect( () => {
    getCoords()
    savedimages.map(image => {
      //document.getElementById(`item${image.id}`).addEventListener("mouseup", ()=>console.log('up'), false)
console.log(image.id)
      document.getElementById(image.id).addEventListener("mousedown", dragStart, false);
      document.getElementById(image.id).addEventListener("mousemove", drag, false);
      document.getElementById(image.id).addEventListener("mouseup", dragEnd, false);
      }
    )
  },[savedimages])
  

  // axios
  //   .get(`${URL}?key=${apikey}&id=1149841`)
  //   .then((res) => setPic(res.data.hits[0].previewURL))
  //   .catch((err) => console.log(err));

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(`${URL}?key=${apikey}&q=${e.target.searchbox.value}&per_page=5`)
      .then((res) => setSearchimages(res.data.hits))
      .catch((err) => console.log(err));
  };

  const  addImage = (e,image) => {
    const {id,previewURL,largeImageURL} = image
    const imageobj = {id,previewURL, largeImageURL}
    const newimagearray = [...savedimages,imageobj]
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
      }
    )
    console.log(savedimages)
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
  let xOffset = 0;
  let yOffset = 0;

  function dragStart(e) {
    var dragItem = document.getElementById(e.target.id)
    savedimages.map( image => { 
      if(e.target.id == image.id){
        console.log(image.coords.x+" "+image.coords.y)
        initialX = image.coords.x
        initialY = image.coords.y
      }
    })
    

    // if (e.type === "touchstart") {
    //   initialX = e.touches[0].clientX - xOffset;
    //   initialY = e.touches[0].clientY - yOffset;
    // } else {
    //   initialX = e.clientX- xOffset;
    //   initialY = e.clientY - yOffset;
    // }

    if (e.target === dragItem) {
      active = true;
    }
  }

  function dragEnd(e) {
    
    // initialX = currentX;
    // initialY = currentY;

    active = false;
    document.removeEventListener("mousemove", drag, false);
    console.log(active)
  }

  function drag(e) {
    var dragItem = document.getElementById(e.target.id)
    if (active) {
    
      e.preventDefault();
    
      if (e.type === "touchmove") {
        currentX = e.touches[0].clientX - initialX;
        currentY = e.touches[0].clientY - initialY;
      } else {
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
      }

      xOffset = currentX;
      yOffset = currentY;

      //(dragItem && setTranslate(currentX, currentY, dragItem))
      setTranslate(currentX, currentY, dragItem)
//console.log(currentX+" "+currentY)
    }
  }

  function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input type="text" name="searchbox" />
        <button>Search</button>
      </form>
      {searchimages.map((image) => (
        <img src={image.previewURL} onClick={(e) => 
          addImage(e,image)} />
      ))}
      <br />
      {savedimages.map(image =>
        <span>
          <Link to={`/imagesearch/`}>
          <img src={image.previewURL} id={image.id}/>
          </Link>
          <span  onClick={ () => removeImage(image.id) } >X</span>
        </span>       
      )}
  
    </main>
  );
}

export default ImageSearch;
