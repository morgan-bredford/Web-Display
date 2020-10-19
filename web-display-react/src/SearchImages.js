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
            search_images: [],
            URL: "https://pixabay.com/api",
            apikey: "18623126-9e0d07d5ea60888b927459e25",
            page: 0,
            large_image: "",
            ta: Array.from("123456"),
        };
        this.searchImages = this.searchImages.bind(this)
    }

    handleSubmit = (e,query,page) => {
        e.preventDefault();
        this.setState({query: query,page: page})
    }

    searchImages() {
        axios
          .get(`${this.state.URL}?key=${this.state.apikey}&q=${this.state.query}&per_page=9&page=${this.state.page}`)
          .then((res) => this.setState({search_images: res.data.hits}))
          .catch((err) => console.log(err));
    };

    componentDidUpdate(prevProps,prevState){
        if(this.state.query && this.state.page !== prevState.page) this.searchImages()
    }

    addImage = (e,image) => {
        const {id,previewURL,largeImageURL} = image
        const imageobj = {id,previewURL, largeImageURL,query: this.state.query}
        const newimagearray = [...(JSON.parse(sessionStorage.getItem('imagearray'))),imageobj]
        sessionStorage.setItem('imagearray',JSON.stringify(newimagearray))
        this.props.setSavedimages(newimagearray)
    }

    imageNav = (e,move_index) => {
        e.stopPropagation()  
        const index = this.state.search_images.findIndex(img => img.largeImageURL === this.state.large_image) + move_index
        if(index > -1 && index < this.state.search_images.length){
            this.setState(
           { large_image: 
            this.state.search_images[(this.state.search_images.findIndex(img => img.largeImageURL === this.state.large_image)) + move_index]
            .largeImageURL})
        }
    }

    render(){
        return(
            <div>
                <form onSubmit={(e) => 
                    this.handleSubmit(e,e.target.searchbox.value,1)
                    }>
                    <input type="text" name="searchbox" />
                    <button>Search</button>
                </form>
                { 
                    this.state.large_image ? 
                    <div id="lightbox" onClick={() => {this.setState({large_image: ""})
                    }}>
                        {
                            this.state.search_images.findIndex(img => img.largeImageURL === this.state.large_image) !== 0 ?  
                                <span className="lbnav" onClick={(e) => this.imageNav(e,-1)} >back</span>
                            : null
                        }
                        <div id="lbimgcontainer">
                            <img src={this.state.large_image} className="lbimg" onClick={(e) => {
                                e.stopPropagation()
                                }}/>
                            <span id="lbclose" onClick={() => {this.setState({large_image: ""})
                        }} >
                                X</span>
                        </div>
                        {
                            this.state.search_images.findIndex(img => img.largeImageURL === this.state.large_image) + 1 < this.state.search_images.length ?  
                                <span className="lbnav" onClick={(e) => this.imageNav(e,1)}>forward</span>
                            : null
                        }
                    </div>
                    : null
                }
                {
                    this.state.search_images.map((image) => (
                    <span>
                        <img src={image.previewURL} onClick={() => this.setState({large_image: image.largeImageURL})} />
                        <span style={{fontSize: '24px'}} onClick={(e) => this.addImage(e,image)} >+</span>
                    </span> ))
                }
                <br />
                {
                    this.state.ta.map( i => <span className="pagelinks" onClick={(e) => {
                        this.setState({page: i})
                        this.props.setPage(i)
                    }}>{i}</span>)
                }
            </div>
        )
    }
}

export default SearchImages