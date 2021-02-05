import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import {auth} from'../firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {home: true}
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: {auth: true},
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/user/Dashboard.vue')
  },
  {
    path: '/latestarts',
    name: 'LatestArts',
    meta: {auth: true},
    component: () => import(/* webpackChunkName: "login" */ '../views/user/LatestArt.vue')
  },
  {
    path: '/yourfav',
    name: 'YourFav',
    meta: {auth: true},
    component: () => import(/* webpackChunkName: "login" */ '../views/user/YourFav.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    meta: {auth: true},
    component: () => import(/* webpackChunkName: "login" */ '../views/user/Cart.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.auth)
  const requiresHome = to.matched.some(record => record.meta.home)
  if (requiresAuth && !auth.currentUser){
    next('/')
  }else{
    next()
  }
  if (requiresHome && auth.currentUser){
    next('/dashboard')
  }else{
    next()
  }
})

export default router
