import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import GalleryVue from '../views/GalleryVue.vue'
import UserPageVue from '../views/UserPageVue.vue'
import Login2 from '../views/Login2.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/gallery',
    name: 'GalleryVue',
    component: GalleryVue
  },
  {
    path: '/login',
    name: 'Login2',
    component: Login2
  },
  {
    path: '/userpage',
    name: 'UserPageVue',
    component: UserPageVue
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
