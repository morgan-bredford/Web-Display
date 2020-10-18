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
            page: 0,
            big: "",
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
          .then((res) => this.setState({searchimages: res.data.hits}))
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
                    this.state.big ? 
                    <div id="lightbox" onClick={(e) => {this.setState({big: ""})
                    }}>
                        <div id="lbimgcontainer">
                            <img src={this.state.big} className="lbimg" onClick={(e) => {
                                e.stopPropagation()
                                }}/>
                            <span id="lbclose" onClick={(e) => {this.setState({big: ""})
                        }} >
                                X</span>
                        </div>
                    </div>
                    : null
                }
                {
                    this.state.searchimages.map((image) => (
                    <span>
                        <img src={image.previewURL} onClick={() => this.setState({big: image.largeImageURL})} />
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