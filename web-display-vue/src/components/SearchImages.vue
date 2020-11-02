<template>
    <div class="formcontainer">
        <h1 >Sök på bilder from Pixabay</h1>
        <form v-on:submit="searchImages">
            <input type="text" name="searchbox"/>
            <button>Sök bild</button>
        </form>
        <button @click="searchImages">search</button>
        <button @click="si">show</button>
        <h4 >klicka på + för att lägga till bilden till ditt galleri</h4>
        <div v-if="search">
            <div className="imagecontainer">
                <span v-bind:key="img.id" v-for="img in search_images">
                    <img :src="img.previewURL" />
                </span>
            </div>
            <div id="linkcontainer">
                <span className="pagelinks" v-if="search_images.length && page > 10">
                      -> </span>
            </div>
        </div>
        <span v-for="index in 10" :key="index" :id="index+page_nav_index" @click="searchImages">{{index+page_nav_index}}</span>
        <br />
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
            page_nav_index: 0,
            page_links: [],
            loading: false,
        }
    },
    created(){
        
    },
    methods: {
        searchImages(e){
            e.preventDefault();
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
            if(e.target.searchbox.value){
                this.query = e.target.searchbox.value
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
        si(){
            console.log(this.search_images[0].previewURL)
        }
    },

}
</script>

<style>
.imagecontainer{
    display: flex;

}
</style>