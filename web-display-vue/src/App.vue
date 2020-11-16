<template>
  <div>
    <Navbar />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Navbar from './components/Navbar.vue'
import './css/main.css'

export default {
  name: 'App',
  components: {
    Navbar,
  },
  data() {
    return {
     
    }
  },
   mounted() {
      if( !this.loggedIn && localStorage.getItem('user')){
          this.setUser(JSON.parse(localStorage.getItem('user')))
          this.logIn()
      }else
      if( !this.loggedIn && sessionStorage.getItem('galleryimages') ){
          this.setGallery(JSON.parse(sessionStorage.getItem('galleryimages')))
      }
    },
  computed: {
      ...mapState(['user','loggedIn']),
  },
  methods: {
      ...mapMutations(['setUser','setGallery','logIn'])
  }
}
</script>

<style>

</style>
