import React, { Component } from "react";
import axios from "axios";
//import {Link} from 'react-router-dom'
import './css/searchimages.css'
import API_KEY from './api_key.js'


class SearchImages extends Component {
  constructor(props) {
        super(props);
        this.state = {
            search: true,
            query: "",
            search_images: [],
            URL: "https://pixabay.com/api",
            apikey: API_KEY,
            page: 0,
            large_image: "",
            page_nav_index: 1,
            page_links: [],
            loading: false,
            current_image: "",
        };
    }

    componentDidUpdate(prevProps,prevState){
        if(this.state.query && this.state.query !== prevState.query) {this.searchImages()}
        if(this.state.query && this.state.page !== prevState.page) {this.searchImages()}
        if(this.state.page_nav_index !== prevState.page_nav_index){this.pageNav()}
        if(this.state.large_image !== prevState.large_image){this.setState({loading: true})}
    }

    handleSubmit = (e,query,page) => {
        e.preventDefault();
        this.setState({query, page})
        this.pageNav()
        document.getElementById('main_search').style.backgroundImage = 'none'
    }

    searchImages = () => {
        axios
          .get(`${this.state.URL}?key=${this.state.apikey}&q=${this.state.query}&per_page=9&page=${this.state.page}`)
          .then((res) => this.setState({search_images: res.data.hits}))
          .catch((err) => console.log(err));
    };

    addImage = (e,image) => {
        e.stopPropagation()
        const date = new Date()
        const {id,previewURL,largeImageURL} = image
        const imageobj = {id,previewURL, largeImageURL,query: this.state.query, time: date.getTime()}
   
        if(this.props.loggedIn)
        {
            const ids = this.props.user[0].galleryimages.map( img => img.id)
            if(!ids.includes(image.id)){
                let user = this.props.user
                const newimagearray = [...this.props.user[0].galleryimages,imageobj]
                user[0].galleryimages.push(imageobj)      
                axios
                //.post("http://127.0.0.1:8080/users/update",[{username: this.props.user[0].username, galleryimages: user[0].galleryimages}])
                .post("http://127.0.0.1:8080/users/update",[this.props.user[0]])
                .then((res) => {
                    this.props.setUser(user)
                    localStorage.setItem('user',JSON.stringify(user))
                    this.props.setSavedimages(newimagearray) 
                })
                .catch(err => {
                    console.log(err.response)})
            }
        }else{
            const ids = JSON.parse(sessionStorage.getItem('imagearray')).map( img => img.id)
            if(!ids.includes(image.id)){
                const newimagearray = [...(JSON.parse(sessionStorage.getItem('imagearray'))),imageobj]
                sessionStorage.setItem('imagearray',JSON.stringify(newimagearray))
                this.props.setSavedimages(newimagearray)
            }
        }
      
        
    }

    imageNav = (e,move_index) => {
        e.stopPropagation()  
        const index = this.state.search_images.findIndex(img => img.largeImageURL === this.state.large_image) + move_index
        if(index > -1 && index < this.state.search_images.length){
            this.setState(
                {large_image: 
                        this.state.search_images[(this.state.search_images.findIndex(img => img.largeImageURL === this.state.large_image)) + move_index]
                        .largeImageURL}
            )
        }
    }

    pageNav = () => {
        const page_array = []
        for(let i=0;i<10;i++){
            page_array.push(this.state.page_nav_index + i)
        }
        this.setState({page_links: page_array})
    }

    render(){
        return(
            <div>
                <br />
                <h1 id="h1_search_img">Sök på bilder från Pixabay</h1>
                <form id="form_search_img" onSubmit={(e) => 
                    this.handleSubmit(e,e.target.searchbox.value,1)
                    }>
                    <input type="text" name="searchbox" style={{width: '40vw'}}/>
                    <button>Sök bild</button>
                </form>
                <br />
                { 
                    this.state.large_image ? 
                        <div id="lightbox" onClick={() => this.setState({large_image: ""})}>
                            {
                                this.state.search_images.findIndex(img => img.largeImageURL === this.state.large_image) !== 0 ?  
                                    <span className="lbnav" onClick={(e) => {this.imageNav(e,-1)}} ><img src="/images/backward_arrow.svg" className="arrow" alt="arrow"/></span>
                                : null
                            }
                            <div id="lbimgcontainer">
                                <img src={this.state.large_image} className="lbimg" onLoad={() => this.setState({loading: false})} onClick={(e) => {e.stopPropagation()}}/>
                                { 
                                    this.state.loading ? <span id="lbload" >loading...</span> : null
                                }
                                <span id="lbclose" onClick={() => {this.setState({large_image: ""})}} >X</span>
                                <aside id="lb_add_img" onClick={(e) => this.addImage(e,this.state.current_image)}><span id="lb_add_img_plus">+</span><br />lägg till bild</aside>
                            </div>
                            {
                                this.state.search_images.findIndex(img => img.largeImageURL === this.state.large_image) + 1 < this.state.search_images.length ?  
                                    <span className="lbnav" onClick={(e) => {this.imageNav(e,1)}}><img src="/images/forward_arrow.svg" className="arrow" alt="arrow"/></span>
                                : null
                            }
                            {/* <button onClick={() => console.log(document.getElementsByClassName('lbimg')[0].getBoundingClientRect())}>dont</button> */}
                        </div>
                    : null
                }
                { 
                  this.state.search_images.length ?  
                    <React.Fragment>
                        <h4 style={{color: 'var(--lightblue)',textAlign: 'center',fontStyle: 'italic',fontWeight: '400'}}>klicka på + för att lägga till bilden till ditt galleri</h4>
                        <div className="imagecontainer">
                        {
                            this.state.search_images.map((image) => (
                                <div className="search_img">
                                    <img src={image.previewURL} style={{cursor: 'pointer'}} 
                                        onClick={() => {
                                            this.setState({large_image: image.largeImageURL,current_image: image})
                                            document.body.scrollTop = 0
                                            document.documentElement.scrollTop = 0
                                            }
                                        } />
                                    <div className="add_img" onClick={(e) => this.addImage(e,image)} >lägg till +</div>
                                </div> 
                            ))
                        }
                        </div>
                        <br />
                        <div id="linkcontainer">
                            {
                                this.state.page_links.length && this.state.page > 10 ? 
                                    <span className="pagelinks" onClick={() => 
                                        this.setState({page: this.state.page_nav_index - 10,page_nav_index: this.state.page_nav_index - 10})
                                    }>
                                    <img src="/images/backward_arrow.svg" className="arrow"  alt="arrow"/></span> 
                                :null
                            }
                            {
                                this.state.page_links.map( index => <span className="pagelinks" onClick={(e) => {
                                    this.setState({page: index})
                                    this.props.setPage(index)
                                }}>{index}</span>)
                            }
                            {
                                this.state.page_links.length ? 
                                    <span className="pagelinks" onClick={() => 
                                        this.setState({page: this.state.page_nav_index + 10,page_nav_index: this.state.page_nav_index + 10})
                                    }><img src="/images/forward_arrow.svg" className="arrow"  alt="arrow"/></span> 
                                :null
                            }
                        </div>
                    </React.Fragment>
                    : null    
                }
            </div>
        )
    }
}

export default SearchImages