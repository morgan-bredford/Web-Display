<template>
    <br />
    <SearchImages />
    <div class='imagecontainer' v-if="user.galleryimages.length">
      <section v-for="img in user.galleryimages" :key="img.id">
          <img :src=img.previewURL />
          <div style="font-size: 14px;font-weight: 600" @click="removeImg(img.id)">ta bort X</div>
      </section>
      <aside>
        <router-link to="/gallery">
          <br />
          <p>Se bilderna i ditt galleri</p>
          <img src="../assets/gallery_arrow.svg" class="arrow" id="gallery_arrow">
        </router-link>
      </aside>
    </div>
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

<style scoped>
.imagecontainer {
    position: relative;
}
aside {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(1vw,-80%);
  width: 7vw;
  height: 7vw;
  background-color: var(--lightgreen);
  border-radius: 50%;
  padding: .4em;
  font-size: .9vw;
}
aside a:visited{
  color: inherit;
}
#gallery_arrow {
    width: 3vw;
}
</style>