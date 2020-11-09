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
    },
    setUser: (state, user) =>   state.user = user,
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
