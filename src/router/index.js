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
    meta: {home: true},
  },
  {
    path: '/dashboard',
    meta: {auth: true},
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/user/Dashboard.vue'),
    children : [
      {
        path: '/',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "login" */ '../views/user/Explore.vue')
      },
      {
        path: '/mypost',
        name: 'MyPost',
        component: () => import(/* webpackChunkName: "login" */ '../views/user/MyPost.vue')
      },
      {
        path: '/favorites',
        name: 'Favorites',
        component: () => import(/* webpackChunkName: "login" */ '../views/user/Favorites.vue')
      },
    ]
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
