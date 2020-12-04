<template>
  <br /><br /><br />
    <div id="lightbox" v-if="large_image" @click.stop="large_image = ''">
        <span class="lbnav" v-if="getImgIndex() > 0"  @click.stop="() => {loading = true;imgNav(-1)}"><img src="../assets/backward_arrow.svg" class="arrow"></span>
        <div id="lbimgcontainer">
            <img class="lbimg" :src="large_image" @load="loading = false" />
            <span id="lbload" v-if="loading" >loading...</span>
            <span id="lbclose" @click="large_image = ''">X</span>
        </div>
        <span class="lbnav" v-if="getImgIndex() < user.galleryimages.length - 1" @click.stop="() => {loading = true;imgNav(1)}"><img src="../assets/forward_arrow.svg" class="arrow"></span>
    </div>
    <div class="imagecontainer" v-if="user.galleryimages.length">
        <span class="prev_card" v-bind:key="img.id" v-for="img in user.galleryimages">
            <img class="prev_card_img" :src="img.previewURL" @click="large_image = img.largeImageURL" />
             <div class="prev_card_info">
                Sökord: {{img.query}}<br />
                Sparad: {{getSaveDate(img)}}
            </div>
        </span>
    </div>
    <div v-else>Ditt galleri är förvärvarande tomt, gå till 'Bygg galleri' för att lägga till bilder</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {

    name: 'Gallery',
    data() {
        return {
            gallery_images: [],
            large_image: "",
            loading: false,
        }
    },
    // mounted() {
    //   if( !this.loggedIn && localStorage.getItem('user')){
    //       this.setUser(JSON.parse(localStorage.getItem('user'))[0])
    //       this.logIn()
    //   }else
    //   if( !this.loggedIn && sessionStorage.getItem('galleryimages') ){
    //       this.setGallery(JSON.parse(sessionStorage.getItem('galleryimages')))
    //   }
    // },
    computed: {
        ...mapState(['user','loggedIn']),
       
    },
    methods: {
        test: () => console.log(this.loggedIn),
        ...mapMutations(['setGallery','setUser','logIn']),
        imgNav(move_index){
            const index = this.getImgIndex()
            this.large_image = this.user.galleryimages[index + move_index].largeImageURL
        },
        getImgIndex() {
            const index = this.user.galleryimages.findIndex(img => img.largeImageURL === this.large_image)
            console.log(index)
            return index
        },
        getSaveDate: img => {
            const date = new Date(img.time)
            const options = {  
                year: "numeric", month: "short",  
                day: "numeric", hour12: false, hour: "2-digit", minute: "2-digit"  
            };
            return date.toLocaleTimeString("en-us", options)
        }
    }

}
</script>

<style>
.prev_card {
  width: 170px;
  height: 180px;
  border-radius: 5px;
  background-color: var(--darkblue);
  padding: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);
}
.prev_card_img {
  width: 150px;
  height: 100px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 1);
}
.prev_card_info {
    color: var(--lightgreen);
    font-size: .9em;
}
</style>