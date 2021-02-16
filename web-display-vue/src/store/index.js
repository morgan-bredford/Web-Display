import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    loggedIn: false,
    user: {galleryimages: []},
  },
  mutations: {
    logIn: (state) =>  state.loggedIn = true,
    logOut: state => {
      state.loggedIn = false
      state.user = {galleryimages: []}
      localStorage.removeItem('user')
    },
    setUser: (state, user) =>   {     
      state.user = user
      console.log(state.user)
    },
    addImg: (state, img) => state.user.galleryimages.push(img),  
    setGallery: (state, imagearray) => state.user.galleryimages = imagearray,
  },
  actions: {
    removeImg(context, id){    
      if(!context.state.loggedIn){
        const newimagearray = context.state.user.galleryimages.filter(
          (image) => image.id !== id
        )
        context.commit('setGallery', newimagearray)
        sessionStorage.setItem('galleryimages',JSON.stringify(newimagearray))
      }else{
        const newimagearray = context.state.user.galleryimages.filter(
          (image) => image.id !== id
        )
        axios
          .post("http://ec2-13-48-85-50.eu-north-1.compute.amazonaws.com:8080/users/update",[{username: context.state.user.username, galleryimages: newimagearray}])
          .then((res) => {
            console.log(res)
            context.commit('setGallery', newimagearray)
            localStorage.setItem('user',JSON.stringify(context.state.user))
          })
          .catch(err => {
            console.log(err.response)})
      }
    },
    updateUser(context, user_form){
      console.log(user_form)
      axios
          .post("http://ec2-13-48-85-50.eu-north-1.compute.amazonaws.com:8080/users/update",[user_form])
          .then((res) => {
            console.log(res)
            localStorage.setItem('user',JSON.stringify(context.state.user))
          })
          .catch(err => {
            console.log(err.response)})
    }
  },
  modules: {
  },
  getters: {
    isLoggedIn: state => state.loggedIn,
    getUser: state => state.user
  }
})
