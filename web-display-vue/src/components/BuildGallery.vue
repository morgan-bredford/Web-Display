<template>
  <SearchImages :savedimages="saved_images" />
  <div className='imagecontainer' v-if="saved_images.length">
      <span v-for="img in saved_images" :key="img.id">
          <img :src=img.previewURL />
      </span>
  </div>
</template>

<script>
import SearchImages from './SearchImages.vue'

export default {
    name: "BuildGallery",
    components: {SearchImages},
    data(){
        return{
            saved_images: [],
        }
    },
    mounted() {
        if(sessionStorage.getItem('imagearray')){
        this.saved_images = JSON.parse(sessionStorage.getItem('imagearray'))
        }else{
        sessionStorage.setItem('imagearray',"[]")
        }
    },
    methods: {
        // addImage(img){
        //     const {id,previewURL,largeImageURL} = img
        //     const imageobj = {id,previewURL, largeImageURL}
        //     const newimagearray = [...(JSON.parse(sessionStorage.getItem('imagearray'))),imageobj]
        //     sessionStorage.setItem('imagearray',JSON.stringify(newimagearray))
        //     this.saved_images.push(img)
        // }
    },

}
</script>

<style>

</style>