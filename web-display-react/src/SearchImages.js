import React, { Component } from "react";
import axios from "axios";
import { render } from "@testing-library/react";


class SearchImages extends Component {
  constructor(props) {
        super(props);
        this.state = {
            search: true,
            query: "",
            searchimages: [],
            URL: "https://pixabay.com/api",
            apikey: "18623126-9e0d07d5ea60888b927459e25",
        };
        this.state.query = this.props.query
        //this.setState(this.props.search,this.props.query)
        this.searchImages = this.searchImages.bind(this)
        const q = this.state.query
    }

    

    searchImages(q,page) {
        console.log('search'+q+this.state.query)
        axios
          .get(`${this.state.URL}?key=${this.state.apikey}&q=${this.state.query}&per_page=5&page=${page}`)
          .then((res) => this.setState({searchimages: res.data.hits}))
          .catch((err) => console.log(err));
    };

    componentDidMount ()  {
        this.searchImages()
    }

    // searchImages = (this.state.query,page) => {
    //     axios
    //       .get(`${this.state.URL}?key=${this.state.apikey}&q=${this.state.query}&per_page=5&page=${page}`)
    //       .then((res) => this.setState({searchimages: res.data.hits}))
    //       .catch((err) => console.log(err));
    // };

    render(){
        return(
            <div>
            {
                this.state.searchimages.map((image) => (
                <img src={image.previewURL}  /> ))
            } 
     
            </div>
        )
    }
}

export default SearchImages