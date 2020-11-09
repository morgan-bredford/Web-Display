import { createStore } from 'vuex'

export default createStore({
  state: {
    loggedIn: false,
  },
  mutations: {
    logIn: state => !state.isLoggedIn
  },
  actions: {
  },
  modules: {
  },
  getters: {
    isLoggedIn: state => state.loggedIn
  }
})
