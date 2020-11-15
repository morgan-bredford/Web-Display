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
console.log('mounted')
      if( !this.loggedIn && localStorage.getItem('user')){
console.log('mounted2')
          this.setUser(JSON.parse(localStorage.getItem('user'))[0])
          this.logIn()
console.log(this.user)
      }else
      if( !this.loggedIn && sessionStorage.getItem('galleryimages') ){
console.log('mounted3')
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
