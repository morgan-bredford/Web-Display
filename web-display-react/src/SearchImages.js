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
            page: 3,
        };
        console.log(props)
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

    render(){
        return(
            <div>     
            {
                this.state.searchimages.map((image) => (
                <img src={image.previewURL}  /> ))
            } 
            {/* {
                ( () => 
                {
                    if(this.state.searchimages.length)
                    {let links;
                    
                        for(let i=1;i<11;i++){
                        links +=  <span >test</span>
                        }
                        return links
                    }
                })()
            } */}
            <span onClick={() => {this.setState({page: 2})
            console.log(this.state.page)
        }}>test</span>
            </div>
        )
    }
}

export default SearchImages