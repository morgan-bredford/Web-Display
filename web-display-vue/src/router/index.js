import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import WelcomeVue from '../views/WelcomeVue.vue'
import Gallery from '../components/Gallery.vue'
import UserInfo from '../components/UserInfo.vue'
import Login from '../components/Login.vue'
import testVue from '../views/testVue.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/welcome',
    name: 'welcomevue',
    component: WelcomeVue
  },
  {
    path: '/buildgallery',
    name: 'buildgallery',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/BuildGallery.vue')
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: Gallery
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/userpage',
    name: 'userpage',
    component: UserInfo
  },
  {
    path: '/test',
    name: 'testvue',
    component: testVue
  }
]

const router = createRouter({
  //history: createWebHashHistory(),
  history: createWebHistory(),
  routes
})

export default router
