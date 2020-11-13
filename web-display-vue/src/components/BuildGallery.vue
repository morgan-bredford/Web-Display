<template>
  <SearchImages />
  <div className='imagecontainer' v-if="user.galleryimages.length">
      <span v-for="img in user.galleryimages" :key="img.id">
          <img :src=img.previewURL /><span @click="removeImg(img.id)">X</span>
      </span>
  </div>
  <button @click="test">test</button>
</template>

<script>
import SearchImages from './SearchImages.vue'
import { mapState, mapMutations } from 'vuex'

export default {
    name: "BuildGallery",
    components: {SearchImages},
    data(){
        return{
            saved_images: [],
        }
    },
    mounted() {
         console.log(JSON.parse(sessionStorage.getItem('galleryimages')))
        if(this.loggedIn){
            this.saved_images = this.user.galleryimages
        }else
        if( !this.loggedIn && sessionStorage.getItem('galleryimages') ){
            this.setGallery(JSON.parse(sessionStorage.getItem('galleryimages')))
         }else{
        sessionStorage.setItem('galleryimages',"[]")
        }
    },
    methods: {
        ...mapMutations(['removeImg','setGallery']),
    },
    computed: {
        ...mapState(['user','loggedIn']),
    }

}
</script>

<style>

</style>