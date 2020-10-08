import React from "react";
import axios from "axios";

function PictureSearch() {
  const URL = "https://pixabay.com/api";
  const apikey = "18623126-9e0d07d5ea60888b927459e25";
  const [pic, setPic] = React.useState("");

  axios
    .get(`${URL}?key=${apikey}&id=1149841`)
    .then((res) => setPic(res.data.hits[0].previewURL));
  //.then((res) => setPic(res.data.hits))
  // .then((res) => (pic = res.data.hits[0].largeImageURL))
  // .then(console.log(pic))
  // .catch((err) => console.log(err));
  return <img src={pic} />;
}

export default PictureSearch;
