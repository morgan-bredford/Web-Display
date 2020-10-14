import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LargeImage from "./LargeImage";
import SearchImages from "./SearchImages";

function ImageSearch() {
  const URL = "https://pixabay.com/api";
  const apikey = "18623126-9e0d07d5ea60888b927459e25";
  const [searchimages, setSearchimages] = useState([]);
  const [savedimages,setSavedimages] = useState([]);
  const [pic, setPic] = useState("");
  const [search, setSearch] = useState({active:false,query:""})

  useEffect( () => {
    if(sessionStorage.getItem('imagearray')){setSavedimages(JSON.parse(sessionStorage.getItem('imagearray')))}
    console.log('render')
  },[])

  useEffect( () => {
    getCoords()
    savedimages.map(image => {
      //document.getElementById(`item${image.id}`).addEventListener("mouseup", ()=>console.log('up'), false)
//console.log(image.id)
      document.getElementById(image.id).addEventListener("mousedown", dragStart, false);
      document.getElementById(image.id).addEventListener("mousemove", drag, false);
      document.getElementById(image.id).addEventListener("mouseup", dragEnd, false);
      }
    )
    console.log('update')
  },[savedimages])

  // axios
  //   .get(`${URL}?key=${apikey}&id=1149841`)
  //   .then((res) => setPic(res.data.hits[0].previewURL))
  //   .catch((err) => console.log(err));

  const handleSubmit = (e) => {
    e.preventDefault();
//console.log(e.target.searchbox.value)
    setSearch({active:true,query: e.target.searchbox.value} )
console.log(search.query)
    // axios
    //   .get(`${URL}?key=${apikey}&q=${query}&per_page=5&page=${page}`)
    //   .then((res) => setSearchimages(res.data.hits))
    //   .catch((err) => console.log(err));
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
        image.coordsoffset = {xoff: 0, yoff: 0}
      }
    )
    //console.log(savedimages)
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
  }
  else{
    console.log('force')
    window.location.reload(false)
  }
}


// const pages = () => {
// for(let i=1;i<11;i++){
//   return <span onClick={(e) => handleSubmit(e,i)}>{i}</span>
// }
// }
  return (
    <main>
      {search.active ? <SearchImages query={search.query} /> : null }
      <a href="https://pixabay.com/api?key=18623126-9e0d07d5ea60888b927459e25&id=1149841&per_page=5&page=2">a</a>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" name="searchbox" />
        <button>Search</button>
      </form>
      {searchimages.map((image) => (
        <img src={image.previewURL} onClick={(e) => 
          addImage(e,image)} />
      ))}
      {
       ( () => 
        {
          if(searchimages.length)
          {
            for(let i=1;i<11;i++){
              return  <span onClick={(e) => handleSubmit(e,1)}>test</span>
          }
        }
      })()
      }
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
    <Link to="/gallery">
      <h2>Gå till Gallery</h2>
    </Link>
    </main>
  );
}

export default ImageSearch;
