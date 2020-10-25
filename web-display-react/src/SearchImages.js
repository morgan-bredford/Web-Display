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
            loading: false,
        };
        this.searchImages = this.searchImages.bind(this)
    }

    handleSubmit = (e,query,page) => {
        e.preventDefault();
        this.setState({query: query,page: page})
        this.pageNav()
    }

    searchImages() {
        axios
          .get(`${this.state.URL}?key=${this.state.apikey}&q=${this.state.query}&per_page=9&page=${this.state.page}`)
          .then((res) => this.setState({search_images: res.data.hits}))
          .catch((err) => console.log(err));
    };

    componentDidUpdate(prevProps,prevState){
        console.log(`update: state: ${this.state.page_links[0]} prevstate: ${prevState.page_links[0]}`)
        if(this.state.query && this.state.page !== prevState.page) {this.searchImages()}
        if(this.state.page_nav_index !== prevState.page_nav_index){this.pageNav()}
        if(this.state.large_image !== prevState.large_image){this.setState({loading: true})}
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

    pageNav = () => {
        const page_array = []
        for(let i=0;i<10;i++){
            page_array.push(this.state.page_nav_index + i)
            console.log(this.state.page_nav_index + i)
        }
        this.setState({page_links: page_array})
    }

    componentDidMount(){this.upimg()}
    upimg = () => {
        document.querySelector('input[type="file"]').addEventListener('change', function() {
          if (this.files && this.files[0]) {
              var img = document.querySelector('img');  // $('img')[0]
        console.log(img)
              img.src = URL.createObjectURL(this.files[0]); // set src to blob url
              img.onload = this.imageIsLoaded;

              axios
                .post("http://127.0.0.1:5000/image", this.files[0])
                .then((res) => console.log(res))
                .catch(err => {
                    console.log(err.response)})
            }
        });
    }

    render(){
        return(
            <div>
                <div >
                    <input type='file' />
                    <img id="myImg" src="#" alt="your image" /><br />
                </div>
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
                                <span className="lbnav" onClick={(e) => {
                                    this.imageNav(e,-1)}} >back</span>
                            : null
                        }
                        <div id="lbimgcontainer">
                            <img src={this.state.large_image} className="lbimg" onLoad={() => this.setState({loading: false})} onClick={(e) => {
                                e.stopPropagation()
                                }}/>
                           { this.state.loading ? <span id="lbload" >loading...</span> : null}
                            <span id="lbclose" onClick={() => {this.setState({large_image: ""})
                        }} >
                                X</span>
                        </div>
                        {
                            this.state.search_images.findIndex(img => img.largeImageURL === this.state.large_image) + 1 < this.state.search_images.length ?  
                                <span className="lbnav" onClick={(e) => {
                                    this.imageNav(e,1)
                                }}>forward</span>
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
                           this.setState({page: this.state.page_nav_index - 10,page_nav_index: this.state.page_nav_index - 10})
                    }
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
                        this.setState({page: this.state.page_nav_index + 10,page_nav_index: this.state.page_nav_index + 10})
                    }>next</span> :null
                }
            </div>
        )
    }
}

export default SearchImages