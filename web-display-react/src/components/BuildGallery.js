import React, { useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchImages from "./SearchImages";

function BuildGallery(props) {
  const [savedimages,setSavedimages] = useState([]);
  const [page, setPage] = useState(1)

  // Sets the gallery image array depending if its a logged in user, a non logged in user or a new user
  useEffect( () => {
    // If the user is logged in get the image array from the user object
    if(props.loggedIn){
      setSavedimages(props.user.galleryimages)
    }else{
    // If the user is not logged in get the image array from session storage or if its a new user set it to empty
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

  // remove image from gallery array and update in every place its stored
  const removeImage = (image_id) => {
    const newimagearray = savedimages.filter(
      (image) => image.id !== image_id
    )

    if(props.loggedIn){
      let user = props.user
      user.galleryimages = newimagearray 
      
      // Updates the database
      axios
      .post("http://ec2-13-48-85-50.eu-north-1.compute.amazonaws.com:8080/users/update",[user])
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

  const removeBackground = () => document.getElementById('main_search').style.backgroundImage = 'none'

  // Experimental sorting images through dragging, only works in Chrome
  // const getCoords =  () => {
  //   savedimages.map( image => {
  //       const obj = document.getElementById(image.id)
  //       image.coords = findPos(obj)
  //       image.coordsoffset = {xoff: 0, yoff: 0}
  //     }
  //   )
  // }

  // const findPos = (obj) => {
  //   if(obj){
  //     let curleft = 0
  //     let curtop = 0;
  //     if (obj.offsetParent) {
  //       do {
  //         curleft += obj.offsetLeft;
  //         curtop += obj.offsetTop;
  //       } while (obj = obj.offsetParent);
  //       return {x:curleft,y:curtop}
  //       console.log([curleft,curtop])
  //     }
  //   }
  // }

  let active = false;
  // let currentX;
  // let currentY;
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

  // function drag(e) {
  //   if (active) {
  //     e.preventDefault();
    
  //     if (e.type === "touchmove") {
  //       currentX = e.touches[0].clientX - initialX;
  //       currentY = e.touches[0].clientY - initialY;
  //     } else {
  //       currentX = e.clientX - initialX;
  //       currentY = e.clientY - initialY;
  //     }

  //     savedimages.map( image => { 
  //       if(e.target.id === image.id){
  //         currentX += image.coordsoffset.xoff
  //         currentY += image.coordsoffset.yoff
  //       }
  //       return null
  //     })

  //     setTranslate(currentX, currentY, dragItem)
  //   }
  // }

  function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
  }

  // function dragEnd(e) {
  //   let sendimage = {}
  //   savedimages.map( image => { 
  //     if(e.target.id == image.id){
  //       image.coords.x = image.coords.x + currentX
  //       image.coords.y = image.coords.y + currentY
  //       image.coordsoffset.xoff = currentX
  //       image.coordsoffset.yoff = currentY
  //       sendimage = image
  //     }
  //   })

  //   active = false;
  //   document.removeEventListener("mousemove", drag, false);
    
  //   console.log(`c:${currentX} o:${e.clientX} i:${initialX}`)
  //   console.log(`c:${currentY} o:${e.clientY} i:${initialY}`)
  //   moveImage(sendimage)
  // }

// const moveImage = (moveimage) => {
//   const temparray = []
//   savedimages.map(
//     image => {
//   console.log(image.id)
//       if(image.id !== moveimage.id){

//         if(image.coords.x < moveimage.coords.x){
//           temparray.push(image)
//         } else if (moveimage.coords.y <= (image.coords.y + 50) && (moveimage.coords.y >= image.coords.y - 50)){
//           temparray.push(moveimage)
//           temparray.push(image)
//           moveimage.coords = {x:99999,y:99999}
//         } else {
//           temparray.push(image)
//         }
//       }
//     }
//   )
// console.log(`ta: ${temparray} sav:${savedimages}`)
//   if(temparray.length === savedimages.length){
//     console.log('true')
//     sessionStorage.setItem('imagearray',JSON.stringify(temparray))
// console.log(`inside: ${temparray[0].id}`)
//     setSavedimages(temparray)
//     window.location.reload(false)
//   }else{
//     window.location.reload(false)
//   }
// }

  return (
    <main id="main_search">
      <SearchImages setSavedimages={setSavedimages} page={page} setPage={setPage}  loggedIn={props.loggedIn} user={props.user} setUser={props.setUser} />
      <br />
      {/* Checks if there are any images saved to the gallery and if so displays them */}
     { savedimages.length ?
      <>
        {removeBackground()}
        <Link to={{pathname: "/gallery",
          savedImages:{savedimages}}}>
            <p id="gallery_link">
              <h3 style={{width: 'max-content'}}>
              Se bilderna i ditt galleri
              <img src="/images/gallery_arrow.svg" className="arrow" style={{position: 'absolute',width: '1.25em',marginLeft: '5px'}} alt="arrow"/></h3>
            </p>
        </Link>
        <div className='imagecontainer'>
          {/* Loop through the saved images and display them */}
          { savedimages.map(image =>
            <div className="search_img">
              <Link to={`/imagesearch/`}>
              <img src={image.previewURL} id={image.id}/>
              </Link>
              <div style={{textAlign: 'center',cursor: 'pointer'}} onClick={ () => removeImage(image.id) } >ta bort X</div>
            </div>       
          )}
        </div>
        <h4 style={{color: 'rgba(0, 0, 0, 0.7)',textAlign: 'center',fontStyle: 'italic',fontWeight: '400',display: 'none'}}>dra bilderna och släpp dem för att ändra ordning på dem i galleriet</h4>
      </>
      :null
      }
    </main>
  );
}

export default BuildGallery;