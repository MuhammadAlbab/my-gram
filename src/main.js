import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import { auth } from '../src/firebase'

Vue.prototype.$axios = axios
Vue.config.productionTip = false
let app

auth.onAuthStateChanged(() => {
  if(!app){
    new Vue({
      router,
      vuetify,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


