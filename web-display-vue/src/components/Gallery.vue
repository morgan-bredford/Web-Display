<template>
  <br /><br /><br />

        <div id="lightbox" v-if="large_image">
            <span class="lbnav" @click="imgNav($event, -1)">-></span>
            <div id="lbimgcontainer">
                <img :src="large_image" />
                <span id="lbload" >loading...</span>
                <span id="lbclose" @click="large_image = ''">X</span>
                <span class="lbnav" @click="imgNav($event, 1)">-></span>
            </div>
        </div>

    <div class="imagecontainer" v-if="user.galleryimages.length">
        <span class="prev_card" v-bind:key="img.id" v-for="img in user.galleryimages">
            <img class="prev_card_img" :src="img.previewURL" @click="large_image = img.largeImageURL" />
             <div class="prev_card_info">
                Sparad: datum <br />
                Sökord: {{img.query}}
            </div>
        </span>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {

    name: 'Gallery',
    data() {
        return {
            gallery_images: [],
            large_image: "",
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
        ...mapMutations(['setGallery','setUser','logIn'])
    }

}
</script>

<style>
.prev_card {
  width: 170px;
  height: 180px;
  border-radius: 5px;
  background-color: rgba(207, 195, 248, 0.75);
  margin: 10px;
  padding: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);
}

.prev_card_img {
  width: 150px;
  height: 100px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 1);
}

</style>