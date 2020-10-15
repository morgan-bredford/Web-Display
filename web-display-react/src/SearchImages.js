import React, { Component } from "react";
import axios from "axios";
//import {Link} from 'react-router-dom'
import { render } from "@testing-library/react";
import './SearchImages.css'


class SearchImages extends Component {
  constructor(props) {
        super(props);
        this.state = {
            search: true,
            query: "",
            searchimages: [],
            URL: "https://pixabay.com/api",
            apikey: "18623126-9e0d07d5ea60888b927459e25",
            page: 1,
            ta: Array.from("123456"),
            addImage: () => {}
        };
        console.log(props)
        this.state.addImage = this.props.add_image
        this.state.query = this.props.query
        this.searchImages = this.searchImages.bind(this)
    }

    searchImages() {
        axios
          .get(`${this.state.URL}?key=${this.state.apikey}&q=${this.state.query}&per_page=5&page=${this.state.page}`)
          .then((res) => this.setState({searchimages: res.data.hits}))
          .catch((err) => console.log(err));
    };

    componentDidMount()  {
        if(this.state.query) this.searchImages()
    }

    componentDidUpdate(prevProps,prevState){
        if(this.state.query && this.state.page !== prevState.page){
            axios
            .get(`${this.state.URL}?key=${this.state.apikey}&q=${this.state.query}&per_page=5&page=${this.state.page}`)
            .then((res) => this.setState({searchimages: res.data.hits}))
            .catch((err) => console.log(err));
        }
    }

    render(){
        return(
            <div>
                {console.log(this.state.page)}
            {
                this.state.searchimages.map((image) => (
                <img src={image.previewURL} onClick={(e) => this.state.addImage(e,image)} /> ))
            }
            <br />
            {
                this.state.ta.map( i => <span className="pagelinks" onClick={(e) => {this.setState({page: i}) }}>{i}</span>)
            }
            </div>
        )
    }
}

export default SearchImages