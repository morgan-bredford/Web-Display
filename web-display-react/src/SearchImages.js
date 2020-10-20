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
            page_nav_index: 1,
            page_links: [],
            dsf: "ertre",
        };
        this.searchImages = this.searchImages.bind(this)
    }

    handleSubmit = (e,query,page) => {
        e.preventDefault();
        this.setState({query: query,page: page})
        this.pageNav(0)
        console.log(`render: ${this.state.page_nav_index}`)
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

    pageNav = (move_index) => {
        console.log(`movei: ${move_index}`)
        const page_array = []
        for(let i=0;i<10;i++){
            page_array.push(this.state.page_nav_index + i)
            console.log(this.state.page_nav_index + i)
        }
        this.setState({page_links: page_array,page_nav_index: this.state.page_nav_index + move_index})
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
                    this.state.page_links.length && this.state.page > 10 ? <span onClick={() => 
                       { 
                           this.setState({page_nav_index: this.state.page_nav_index - 10})
                       this.pageNav(0)
                        this.setState({page: this.state.page_nav_index})
                    console.log(`page:${this.state.page} index:${this.state.page_nav_index}`)}
                    }>next</span> :null
                }
                {
                    this.state.page_links.map( index => <span className="pagelinks" onClick={(e) => {
                        this.setState({page: index})
                        this.props.setPage(index)
                    }}>{index}</span>)
                }
                {
                    this.state.page_links.length ? <span onClick={() => 
                       { //this.setState({page_nav_index:  10})
                       this.pageNav(10)
                        this.setState({page: this.state.page_nav_index})
                    console.log(`page:${this.state.page} index:${this.state.page_nav_index}`)}
                    }>next</span> :null
                }
                <button onClick={() => console.log(`page:${this.state.page} index:${this.state.page_nav_index}`)}>retr</button>
            </div>
        )
    }
}

export default SearchImages