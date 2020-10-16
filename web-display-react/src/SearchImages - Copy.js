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
            big: "",
            ta: Array.from("123456"),
            addImage: () => {}
        };
        console.log(props)
        this.state.addImage = this.props.addImage
        this.state.query = this.props.query
        this.state.page = this.props.page
        this.searchImages = this.searchImages.bind(this)
    }

    searchImages() {
        axios
          .get(`${this.state.URL}?key=${this.state.apikey}&q=${this.state.query}&per_page=9&page=${this.state.page}`)
          .then((res) => this.setState({searchimages: res.data.hits}))
          .catch((err) => console.log(err));
    };

    componentDidMount()  {
        if(this.state.query) this.searchImages()
    }

    componentDidUpdate(prevProps,prevState){
        if(this.state.query && this.state.page !== prevState.page){
            axios
            .get(`${this.state.URL}?key=${this.state.apikey}&q=${this.state.query}&per_page=9&page=${this.state.page}`)
            .then((res) => this.setState({searchimages: res.data.hits}))
            .catch((err) => console.log(err));
        }
    }

    render(){
        return(
            <div>
                 { this.state.big ? 
                 <div style={{width: '500px',height: '300px'}}>
                     <img src={this.state.big} style={{width: '500px',height: '300px',objectFit: 'contain'}}/>
                     <span style={{fontSize: '24px'}} onClick={() => this.setState({big: ""})} >
                        X</span>
                </div>  
                         : null}
                {console.log(this.state.page)}
            {
                this.state.searchimages.map((image) => (
                <span>
                    <img src={image.previewURL} onClick={() => this.setState({big: image.largeImageURL})} />
                    <span style={{fontSize: '24px'}} onClick={(e) => this.state.addImage(e,image)} >+</span>
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