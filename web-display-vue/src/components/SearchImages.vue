<template>
<div class="">
    <div id="lightbox" v-if="large_image" @click.stop="large_image = ''">
        <span class="lbnav" v-if="getImgIndex() > 0" @click.stop="() => {loading = true;imgNav(-1)}">-></span>
        <div id="lbimgcontainer">
            <img class="lbimg" :src="large_image" @load="loading = false" />
            <span id="lbload" v-if="loading" >loading...</span>
            <span id="lbclose" @click="large_image = ''">X</span>
            <span class="lbnav" v-if="getImgIndex() < search_images.length - 1" @click.stop="() => {loading = true;imgNav(1)}">-></span>
        </div>
    </div>
    <div>
        <h1 >Sök på bilder från Pixabay</h1>
        <div class="formcontainer">
            <form id="searchbox" @submit.prevent="searchImages">
                <input type="text" name="searchbox" v-model="query" />
                <button>Sök bild</button>
            </form>
        </div>
    </div>
        <div v-if="search">
            <div class="imagecontainer">
                <div :key="img.id" v-for="img in search_images">
                    <img :src="img.previewURL" @click="() =>  {large_image = img.largeImageURL;loading = true}" /><div @click="addImage(img)">lägg till +</div>
                </div>
            </div>
            <div id="linkcontainer" v-if="search_images.length">
                <span class="pagelinks" id="prev_ten" v-if="page > 10" @click="searchImages">
                      -> </span>
                <span class="pagelinks" v-for="(n, index) in 10" :key="index" :id="index+page_nav_index" @click="searchImages">{{index+page_nav_index}}</span>
                 <span class="pagelinks" id="next_ten" @click="searchImages">
                      -> </span>
            </div>
        </div>
        <br />
    
</div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from 'vuex'

export default {
    name: "SearchImages",
    data(){
        return{
            search: false,
            query: "",
            search_images: [],
            URL: "https://pixabay.com/api",
            apikey: "18623126-9e0d07d5ea60888b927459e25",
            page: 1,
            large_image: "",
            page_nav_index: 1,
            loading: false,
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
            this.large_image = this.search_images[index + move_index].largeImageURL
            console.log(index)
        },
        addImage(img){
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
                // this.saved_images.push(img)
                console.log(this.user)
                this.addimg(imageobj) 
            }
        },
    },

}
</script>

<style scoped>
    .formcontainer {
        border: none;
    }
    form {
        display: flex;
        flex-direction: row;
    }
    form input {
        width: 80%;      
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
        background-color: #eee;
        cursor: pointer;
        transition: background 0.3s linear;
    }

    .pagelinks:hover {
        color: #eee;
        background-color: #222;
    }

    #lightbox {
        /* width: 100vw;
            height: 100vh; */
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.8);
    }

    #lbimgcontainer {
        display: flex;
        width: 80vw;
        height: 80vh;
    }

    .lbnav {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        font-size: 3em;
        text-align: center;
        line-height: 150%;
        background-color: #eee;
        cursor: pointer;
    }

    .lbimg {
     object-fit: contain;
    }

    #lbclose {
        display: absolute;
        width: 50px;
        height: 50px;
        font-size: 24px;
        border-radius: 50%;
        text-align: center;
        line-height: 200%;
        background-color: #eee;
        cursor: pointer;
        transform: translate(-75px, -50px);
    }

    #lbload {
        position: absolute;
        top: 50%;
        left: 50%;
        color: #fff;
        text-align: center;
        font-size: 36px;
        transform: translate(-100%, -50%);
    }


</style>