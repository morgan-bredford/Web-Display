<template>
  <SearchImages />
  <div class='imagecontainer' v-if="user.galleryimages.length">
      <span v-for="img in user.galleryimages" :key="img.id">
          <img :src=img.previewURL /><span @click="removeImg(img.id)">X</span>
      </span>
  </div>
  <button @click="test">test</button>
</template>

<script>
import SearchImages from './SearchImages.vue'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    name: "BuildGallery",
    components: {SearchImages},
    data(){
        return{

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
    methods: {
        ...mapMutations(['setGallery','setUser','logIn','test']),
        ...mapActions(['removeImg']),
    },
    computed: {
        ...mapState(['user','loggedIn']),
    }

}
</script>

<style>

</style>