import { createStore } from 'vuex'

export default createStore({
  state: {
    loggedIn: false,
    user: {galleryimages: []},
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
    setGallery: (state, imagearray) => state.user.galleryimages = imagearray
  },
  actions: {
    // addImage(img){
    //   const {id,previewURL,largeImageURL} = img
    //   const imageobj = {id,previewURL, largeImageURL, query: this.query }
    //   if(this.loggedin){
    //     user.galleryimages.push(imageobj)
    //       const user = (JSON.parse(localStorage.getItem('user')))
    //       user.galleryimages.push(imageobj)
    //       localStorage.setItem('user',JSON.stringify(user))
    //   }else{
    //       const newimagearray = [...(JSON.parse(sessionStorage.getItem('imagearray'))),imageobj]
    //       sessionStorage.setItem('imagearray',JSON.stringify(newimagearray))
    //       this.saved_images.push(img)
    //   }
    // },
  },
  modules: {
  },
  getters: {
    isLoggedIn: state => state.loggedIn,
    getUser: state => state.user
  }
})
