<template>
<div class="">
    <div id="lightbox" v-if="large_image">
        <span class="lbnav" @click="imgNav($event, -1)">-></span>
        <div id="lbimgcontainer">
            <img :src="large_image" />
            <span id="lbload" >loading...</span>
            <span id="lbclose" @click="large_image = ''">X</span>
            <span class="lbnav" @click="imgNav($event, 1)">-></span>
        </div>
    </div>
    <div class="formcontainer">
        <h1 >Sök på bilder from Pixabay</h1>
        <form v-on:submit="searchImages">
            <input type="text" name="searchbox" v-model="query" />
            <button>Sök bild</button>
        </form>
        <button @click="searchImages">search</button>
        <button @click="si">show</button>
        <h4 >klicka på + för att lägga till bilden till ditt galleri</h4>
        <div v-if="search">
            <div class="imagecontainer">
                <span v-bind:key="img.id" v-for="img in search_images">
                    <img :src="img.previewURL" @click="large_image = img.largeImageURL" /><span @click="$emit('addimg',img)">+</span>
                </span>
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
</div>
</template>

<script>
import axios from "axios";
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
    created(){
        
    },
    methods: {
        searchImages(e){
            e.preventDefault();
            if(e.target.id === 'prev_ten'){
               this.page_nav_index -= 10
               this.page = this.page_nav_index
               axios
                    .get(`${this.URL}?key=${this.apikey}&q=${this.query}&per_page=10&page=${this.page}`)
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
        imgNav(e,move_index){
            e.stopPropagation()
            const index = this.search_images.findIndex(img => img.largeImageURL === this.large_image)
            this.large_image = this.search_images[index + move_index].largeImageURL
            console.log(index)
        },
        si(){
            console.log(this.page)
        }
    },

}
</script>

<style>
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