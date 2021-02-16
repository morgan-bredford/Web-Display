<template>
  <main class="about">
    <br />
    <SearchImages />
    <div class='imagecontainer' v-if="user.galleryimages.length">
      <section v-for="img in user.galleryimages" :key="img.id">
          <img :src=img.previewURL />
          <div class="remove_img_text" @click="removeImg(img.id)">ta bort X</div>
      </section>
      <aside>
        <router-link to="/gallery">
          <br />
          <p>Se bilderna i ditt galleri</p>
          <img src="../assets/gallery_arrow.svg" class="arrow" id="gallery_arrow">
        </router-link>
      </aside>
    </div>
  </main>
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
  background-color: rgba(63, 185, 132,.2);
  border-radius: 50%;
  padding: .4em;
  font-size: .9vw;
}
aside a:visited{
  color: inherit;
}
aside:hover {
  background-color: rgba(63, 185, 132,.6);
  /* box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, .7) */
}
aside:hover .arrow {
  animation: move_arrow 1s;
}
@keyframes move_arrow {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(35%);
  }
  40% {
    transform: translateX(25%);
  }
  70% {
    transform: translateX(35%);
  }
  100% {
    transform: translateX(0);
  }
}
#gallery_arrow {
    width: 3vw;
}
.remove_img_text {
  position: relative;
  width: max-content;
  margin: auto;
  display: grid;
  place-items: center;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}
.remove_img_text::after {
  content: '';
  position: absolute;
  right: .3em;
  width: 0px;
  height: 0px;
  background-color: var(--lightgreen);
  box-shadow: 0 0 0 rgb(63, 185, 132);
  z-index: -1;
  transition: box-shadow 1s linear;
}
.remove_img_text:hover::after {
  box-shadow: 0 0 10px 7px rgb(63, 185, 132);
}
</style>