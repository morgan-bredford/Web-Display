import React,{ useState } from "react";
import axios from "axios";

function Match({ match }) {
  const URL = "https://pixabay.com/api";
  const apikey = "18623126-9e0d07d5ea60888b927459e25";
  const [pic, setPic] = useState("");
  console.log(match.params.id);

  axios
    .get(`${URL}?key=${apikey}&id=${match.params.id}`)
    .then((res) => setPic(res.data.hits[0].largeImageURL))
    .catch((err) => console.log(err));

  return <img src={pic} />
}
export default Match;
