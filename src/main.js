import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { auth } from '@/firebase'

Vue.config.productionTip = false

let app
auth.onAuthStateChanged(user => {
  if(!app){
    new Vue({
      router,
      vuetify,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
  if (user) {
    store.dispatch('getUserProfile', user)
  }
})


