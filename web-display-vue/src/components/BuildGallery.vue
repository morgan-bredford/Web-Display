<template>
  <SearchImages :savedimages="saved_images" />
  <div className='imagecontainer' v-if="saved_images.length">
      <span v-for="img in saved_images" :key="img.id">
          <img :src=img.previewURL /><span @click="removeimg(img.id)">X</span>
      </span>
  </div>
  <button @click="test">test</button>
</template>

<script>
import SearchImages from './SearchImages.vue'
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
    name: "BuildGallery",
    components: {SearchImages},
    data(){
        return{
            saved_images: [],
        }
    },
    mounted() {
        if(this.$store.getters.isLoggedIn){
            this.saved_images = this.$store.getters.getUser.galleryimages
        }else
        if(sessionStorage.getItem('imagearray')){
        this.saved_images = JSON.parse(sessionStorage.getItem('imagearray'))
        }else{
        sessionStorage.setItem('imagearray',"[]")
        }
    },
    methods: {
        ...mapMutations({removeimg: 'removeImg'}),
        ...mapGetters({galleryimages: 'getGallery'}),
        // addImage(img){
        //     const {id,previewURL,largeImageURL} = img
        //     const imageobj = {id,previewURL, largeImageURL}
        //     const newimagearray = [...(JSON.parse(sessionStorage.getItem('imagearray'))),imageobj]
        //     sessionStorage.setItem('imagearray',JSON.stringify(newimagearray))
        //     this.saved_images.push(img)
        // }
    },
    computed: {
        ...mapState({user: 'user'}),
        //setGallery(){this.saved_images = this.galleryimages},
    }

}
</script>

<style>

</style>