import { createStore } from 'vuex'

export default createStore({
  state: {
    loggedIn: false,
    user: {},
  },
  mutations: {
    logIn: (state) =>  state.loggedIn = true,
    logOut: state => {
      state.loggedIn = false
      state.user = {}
      localStorage.setItem('user', '[]')
    },
    setUser: (state, user) =>   state.user = user,
    addImg: (state, img) => state.user.galleryimages.push(img),
    removeImg: (state, id) => {
      console.log(id)
      const gi = state.user.galleryimages.filter(
        (image) => image.id !== id
      )
      state.user.galleryimages = gi
    },
    getGallery: state => state.user.galleryimages
  },
  actions: {
  },
  modules: {
  },
  getters: {
    isLoggedIn: state => state.loggedIn,
    getUser: state => state.user
  }
})
