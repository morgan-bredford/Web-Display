import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LargeImage from "./LargeImage";

function ImageSearch() {
  const URL = "https://pixabay.com/api";
  const apikey = "18623126-9e0d07d5ea60888b927459e25";
  const [searchimages, setSearchimages] = useState([]);
  const [savedimages,setSavedimages] = useState([]);

  useEffect( () => {
    if(sessionStorage.getItem('imagearray')){setSavedimages(JSON.parse(sessionStorage.getItem('imagearray')))}
  },[])
 
  const [pic, setPic] = useState("");

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
          <Link to={`/imagesearch/${image.id}`}>
          <img src={image.previewURL} />
          </Link>
          <span  onClick={ () => removeImage(image.id) } >X</span>
        </span>
      )}
    </main>
  );
}

export default ImageSearch;
