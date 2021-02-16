<template>
  <br /><br /><br />
    <!-- Opens the lightbox if an image in the gallery has been clicked  -->
    <div id="lightbox" v-if="large_image" @click.stop="large_image = ''">
        <span class="lbnav" v-if="getImgIndex() > 0"  @click.stop="() => {loading = true;imgNav(-1)}"><img src="../assets/backward_arrow.svg" class="arrow"></span>
        <div id="lbimgcontainer">
            <img class="lbimg" :src="large_image" @load="loading = false" @click.stop="(e) => e.stopPropagation()" />
            <span id="lbload" v-if="loading" >loading...</span>
            <span id="lbclose" @click="large_image = ''">X</span>
        </div>
        <span class="lbnav" v-if="getImgIndex() < user.galleryimages.length - 1" @click.stop="() => {loading = true;imgNav(1)}"><img src="../assets/forward_arrow.svg" class="arrow"></span>
    </div>
    <h4 style="color: var(--lightblue);textAlign: center;fontStyle: italic;fontWeight: 400" v-if="user.galleryimages.length">klicka på bilden</h4>
    <div class="imagecontainer" v-if="user.galleryimages.length">
        <span class="prev_card" v-bind:key="img.id" v-for="img in user.galleryimages"  @click="large_image = img.largeImageURL">
            <img class="prev_card_img" :src="img.previewURL" />
             <div class="prev_card_info">
                Sökord: {{img.query}}<br />
                Sparad: {{getSaveDate(img)}}
            </div>
        </span>
    </div>
    <div id="empty_gallery" v-else>Ditt galleri är förvärvarande tomt, gå till 'Bygg galleri' för att lägga till bilder</div>
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
        //Navigation of which image shows in the lightbox, moves to next or previous in the gallery array 
        imgNav(move_index){
            const index = this.getImgIndex()
            this.large_image = this.user.galleryimages[index + move_index].largeImageURL
        },
        getImgIndex() {
            const index = this.user.galleryimages.findIndex(img => img.largeImageURL === this.large_image)
            console.log(index)
            return index
        },
        // Creates the date string thats added to the image object when saved in the gallery
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
  cursor: pointer;
}
.prev_card:hover {
    background-color: rgb(49, 71, 94,.9);
}
.prev_card_img {
  width: 150px;
  height: 100px;
  margin-bottom: .4em;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 1);
}
.prev_card_img:hover {
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 1);
}
.prev_card_info {
    color: var(--lightgreen);
    font-size: .9em;
    line-height: 1.2em;
}
#empty_gallery {
    width: 70vw;
    margin:auto;
    padding: 9px;
    border-radius: 5px;
    background-color: rgba(63, 185, 132,.6);
}
</style>