import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LargeImage from "./LargeImage";
import SearchImages from "./SearchImages";
import App3 from "./App3";

function BuildGallery(props) {
  const URL = "https://pixabay.com/api";
  const apikey = "18623126-9e0d07d5ea60888b927459e25";
  const [searchimages, setSearchimages] = useState([]);
  const [savedimages,setSavedimages] = useState([]);
  const [pic, setPic] = useState("");
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)

  useEffect( () => {
    if(props.loggedIn){
console.log('reset')
      setSavedimages(props.user[0].galleryimages)
    }else{
      if(sessionStorage.getItem('imagearray')){
        setSavedimages(JSON.parse(sessionStorage.getItem('imagearray')))
      }else{
        sessionStorage.setItem('imagearray',"[]")
      }
    }
   },[])

  // useEffect( () => {
  //   getCoords()
  //   savedimages.map(image => {
  //     document.getElementById(image.id).addEventListener("mousedown", dragStart, false);
  //     document.getElementById(image.id).addEventListener("mousemove", drag, false);
  //     document.getElementById(image.id).addEventListener("mouseup", dragEnd, false);
  //     }
  //   )
  //   console.log('update')
  // },[savedimages])

  // const handleSubmit = (e,query,page) => {
  //   e.preventDefault();
  //   setQuery(e.target.searchbox.value)
  //   axios
  //     .get(`${URL}?key=${apikey}&q=${query}&per_page=5&page=${page}`)
  //     .then((res) => setSearchimages(res.data.hits))
  //     .catch((err) => console.log(err));
  // };

  const removeImage = (image_id) => {
    const newimagearray = savedimages.filter(
      (image) => image.id !== image_id
    )

    if(props.loggedIn){
      let user = props.user
      user[0].galleryimages = newimagearray 
      
      axios
      .post("http://127.0.0.1:8080/users/update",[user[0]])
      .then((res) => {
          props.setUser(user)
          localStorage.setItem('user',JSON.stringify(user))
          setSavedimages(newimagearray) 
      })
      .catch(err => {
          console.log(err.response)})
    }else{
      document.getElementById(image_id).removeEventListener("mousedown",dragStart)
      sessionStorage.setItem('imagearray',JSON.stringify(newimagearray))
      setSavedimages(newimagearray)
    }
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
  console.log(image.id)
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
console.log(`ta: ${temparray} sav:${savedimages}`)
  if(temparray.length === savedimages.length){
    console.log('true')
    sessionStorage.setItem('imagearray',JSON.stringify(temparray))
console.log(`inside: ${temparray[0].id}`)
    setSavedimages(temparray)
    window.location.reload(false)
  }else{
    window.location.reload(false)
  }
}

  return (
    <main>
      <SearchImages setSavedimages={setSavedimages} page={page} setPage={setPage}  loggedIn={props.loggedIn} user={props.user} setUser={props.setUser} />
      <br />
     { savedimages.length ?
       <React.Fragment>
     <Link to={{pathname: "/gallery",
      savedImages:{savedimages}}}>
      <h3 style={{color: 'black',textAlign: 'center'}}>Se bilderna i ditt Gallery {"->"}</h3>
    </Link>
      <div className='imagecontainer'>
        { savedimages.map(image =>
          <span >
            <Link to={`/imagesearch/`}>
            <img src={image.previewURL} id={image.id}/>
            </Link>
            <div style={{textAlign: 'center',cursor: 'pointer'}} onClick={ () => removeImage(image.id) } >ta bort</div>
          </span>       
        )}
      </div>
      <h4 style={{color: 'rgba(0, 0, 0, 0.7)',textAlign: 'center',fontStyle: 'italic',fontWeight: '400'}}>dra bilderna och släpp dem för att ändra ordning på dem i galleriet</h4>
      </React.Fragment>
      :null
      }
      
    <button onClick={() => console.log(savedimages)} >dont</button>
    </main>
  );
}

export default BuildGallery;