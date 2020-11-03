<template>
  <SearchImages @addimg="addImage" />
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
    methods: {
        addImage(img){
            this.saved_images.push(img)
        }
    },

}
</script>

<style>

</style>