<template>
<main>
    <div id="lightbox" v-if="large_image" @click.stop="large_image = ''">
        <span class="lbnav" v-if="getImgIndex() > 0"  @click.stop="() => {loading = true;imgNav(-1)}"><img src="../assets/backward_arrow.svg" class="arrow"></span>
        <div id="lbimgcontainer">
            <img class="lbimg" :src="large_image" @load="loading = false" @click.stop="(e) => e.stopPropagation()"/>
            <aside id="lb_add_img" @click.stop="addImage(current_img)">
                <h1 id="lb_add_img_plus">+</h1>
                <p id="lb_add_img_text">lägg till bild</p>
            </aside>
            <span id="lbload" v-if="loading" >loading...</span>
            <span id="lbclose" @click="large_image = ''">X</span>
        </div>
        <span class="lbnav" v-if="getImgIndex() < search_images.length - 1" @click.stop="() => {loading = true;imgNav(1)}"><img src="../assets/forward_arrow.svg" class="arrow"></span>
    </div>
    <div id="container_search">
        <h1 >Sök på bilder från Pixabay</h1>
        <div class="formcontainer">
            <form id="searchbox" @submit.prevent="searchImages">
                <input type="text" name="searchbox" v-model="query" />
                <button>Sök</button>
            </form>
        </div>
    </div>
    <br />
    <h4 v-if="search" style="color: var(--lightblue);textAlign: center;fontStyle: italic;fontWeight: 400">klicka på + för att lägga till bilden till ditt galleri</h4>
    <div v-if="search">
        <div class="imagecontainer">
            <div :key="img.id" v-for="img in search_images">
                <img :src="img.previewURL" @click="() =>  {large_image = img.largeImageURL;loading = true;current_img = img}" /><div class="add_img_text" @click="addImage(img)">lägg till +</div>
            </div>
        </div>
        <div id="linkcontainer" v-if="search_images.length">
            <span class="pagelinks" id="prev_ten" v-if="page > 10">
                <img src="../assets/backward_arrow.svg" class="arrow" id="prev_ten" @click="searchImages"/></span>
            <span class="pagelinks" v-for="(n, index) in 10" :key="index" :id="index+page_nav_index" @click="searchImages">{{index+page_nav_index}}</span>
                <span class="pagelinks" id="next_ten">
                <img src="../assets/forward_arrow.svg" class="arrow" id="next_ten" @click="searchImages"/></span>
        </div>
    </div>
    <br />
    
</main>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from 'vuex'
import API_KEY from '../api_key.js'

export default {
    name: "SearchImages",
    data(){
        return{
            search: false,
            query: "",
            search_images: [],
            URL: "https://pixabay.com/api",
            apikey: API_KEY,
            page: 1,
            large_image: "",
            page_nav_index: 1,
            loading: false,
            current_img: "",
        }
    },
    computed: {
        ...mapState(['user','loggedIn'])
    },
    methods: {
        ...mapMutations({addimg: 'addImg'}),
        getImgIndex() {
            const index = this.search_images.findIndex(img => img.largeImageURL === this.large_image)
            return index
        },
        searchImages(e){
            // document.getElementsByClassName('formcontainer')[0].style.outline = '40px solid rgba(63, 185, 132, 0.2)'
            document.getElementsByClassName('formcontainer')[0].style.outlineOffset = '-80px'
            if(e.target.id === 'prev_ten'){
               this.page_nav_index -= 10
               this.page = this.page_nav_index
               axios
                    .get(`${this.URL}?key=${this.apikey}&q=${this.query}&per_page=18&page=${this.page}`)
                    .then((res) => {
                        this.search_images = res.data.hits
                        this.search = true
                    })
                .catch((err) => console.log(err));
           }else
            if(e.target.id === 'next_ten'){
               this.page_nav_index += 10
               this.page = this.page_nav_index
               axios
                    .get(`${this.URL}?key=${this.apikey}&q=${this.query}&per_page=10&page=${this.page}`)
                    .then((res) => {
                        this.search_images = res.data.hits
                        this.search = true
                    })
                .catch((err) => console.log(err));
           }else
           if(e.target.id){
               this.page = e.target.id
               axios
                    .get(`${this.URL}?key=${this.apikey}&q=${this.query}&per_page=10&page=${this.page}`)
                    .then((res) => {
                        this.search_images = res.data.hits
                        this.search = true
                    })
                .catch((err) => console.log(err));
           }else
            if(this.query){
                axios
                    .get(`${this.URL}?key=${this.apikey}&q=${this.query}&per_page=10&page=${this.page}`)
                    .then((res) => {
                        this.search_images = res.data.hits
                        this.search = true
                    })
                .catch((err) => console.log(err));
            }else{
                this.search = false
            }
            
        },
        imgNav(move_index){
            const index = this.search_images.findIndex(img => img.largeImageURL === this.large_image)
            this.current_img = this.search_images[index + move_index]
            this.large_image = this.search_images[index + move_index].largeImageURL
            console.log(index)
        },
        addImage(img){
            const ids = this.user.galleryimages.map( img => img.id)
            if(!ids.includes(img.id)){
            const {id,previewURL,largeImageURL} = img
            const date = new Date()
            const imageobj = {id,previewURL, largeImageURL, query: this.query, time: date.getTime() }
            const newimagearray = [...this.user.galleryimages,imageobj]
            if(this.loggedIn){

                axios
                    .post("http://ec2-13-48-204-0.eu-north-1.compute.amazonaws.com:8080/users/update",[{username: this.user.username, galleryimages: newimagearray}])
                    .then((res) => {
                        console.log(res)
                        this.addimg(imageobj)
                        localStorage.setItem('user',JSON.stringify(this.user))
                    })
            .catch(err => {
                console.log(err.response)})
            
            }else{
                sessionStorage.setItem('galleryimages',JSON.stringify(newimagearray))
                this.addimg(imageobj) 
            }
            }
        },
    },

}
</script>

<style scoped>
    main {
        font-family: Montserrat, Arial;
    }
    .formcontainer {
        margin-bottom: 20px;
        border: none;
        border-radius: 5px;
    }
    form {
        display: flex;
        flex-direction: row;
        height: 5vh;
        padding: .5em;
    }
    form input {
        width: 80%;
        font-style: normal;      
    }
    form button {
        width: 18%;
        height: 100%;
        margin: 0px;
    }
    .imagecontainer{
        display: flex;
    }
    #linkcontainer {
        display: flex;
        justify-content: center;
    }
    .pagelinks {
        display: inline-block;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        text-align: center;
        line-height: 200%;
        color: var(--darkblue);
        background-color: rgba(63, 185, 132, 0.5);
        cursor: pointer;
        transform: translateY(-25%);
        transition: background 0.3s linear;
    }
    .pagelinks:hover {
        color: rgba(63, 185, 132, 0.9);
        background-color: var(--darkblue);
    }
    #lb_add_img {
        position: absolute;
        top: 25%;
        right: 0;
        transform: translate(0%, -50%);
        display: grid;
        place-items: center;
        width: 8vw;
        height: 8vw;
        color: rgba(0, 0, 0, .3);
        background-color: rgba(63, 185, 132, 0.28);
        text-align: center;
        font-size: 1.1vw;
        border-radius: 5px;
        cursor: pointer;
    }
    #lb_add_img_plus {
        width: 5vw;
        height: 5vw;
        font-size: 10vw;
        line-height: 7vw;
        transform: translate(-0.25vw,-0.70vw);
    }
    #lb_add_img:hover {
        color: rgba(0, 0, 0, 1);
        background-color: rgba(63, 185, 132, 0.55);
    }
    .add_img_text {
        position: relative;
        width: max-content;
        margin: auto;
        font-family: Montserrat,Arial;
        font-weight: 600;
        cursor: pointer;
    }
    .add_img_text::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        transform: translate(-15%,25%);
        width: 100%;
        height: 100%;
        background-color: rgba(63, 185, 132, 0.3);
        z-index: -1;
        transition: transform .5s linear;
    }
    .add_img_text:hover::after {
        transform: translate(-5%,15%);
    }
</style>