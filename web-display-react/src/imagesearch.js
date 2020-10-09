import React, { useState } from "react";
import axios from "axios";

function ImageSearch() {
  const URL = "https://pixabay.com/api";
  const apikey = "18623126-9e0d07d5ea60888b927459e25";
  const [searchimages, setSearchimages] = useState([]);
  const [pic, setPic] = useState("");
  let searchRes = {};

  // axios
  //   .get(`${URL}?key=${apikey}&id=1149841`)
  //   .then((res) => setPic(res.data.hits[0].previewURL))
  //   .catch((err) => console.log(err));

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(`${URL}?key=${apikey}&q=${e.target.searchbox.value}&per_page=5`)
      .then((res) => setSearchimages(res.data.hits));
    //   .then(() => console.log(searchimages));
    // //   .catch((err) => console.log(err));
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input type="text" name="searchbox" />
        <button>Search</button>
      </form>
      {searchimages.map((image) => (
        <img src={image.previewURL} />
      ))}
    </main>
  );
}

export default ImageSearch;
