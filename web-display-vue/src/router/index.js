import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import WelcomeVue from '../views/WelcomeVue.vue'
import GalleryVue from '../views/GalleryVue.vue'
import UserPageVue from '../views/UserPageVue.vue'
import LoginVue from '../views/LoginVue.vue'
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
    name: 'buildgalleryvue',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/BuildGalleryVue.vue')
  },
  {
    path: '/gallery',
    name: 'galleryvue',
    component: GalleryVue
  },
  {
    path: '/login',
    name: 'login',
    component: LoginVue
  },
  {
    path: '/userpage',
    name: 'userpagevue',
    component: UserPageVue
  },
  {
    path: '/test',
    name: 'testvue',
    component: testVue
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
