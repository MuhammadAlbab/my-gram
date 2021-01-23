import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import * as fb from '../firebase'

Vue.use(Vuex)
export default new Vuex.Store({
  
  state: {
    loginDialog: false,
    registerDialog: false,
    welcomeNotif: false,
    userProfile: {},
  },

  mutations: {
    changeLd(state, payload){
      state.loginDialog = payload
    },
    changeRd(state, payload){
      state.registerDialog = payload
    },

    setUserProfile(state, payload){
      state.userProfile = payload
    }
  },
  
  actions: {
    changedLd({commit}, payload){
      commit('changeLd', payload)
    },
    changedRd({commit}, payload){
      commit('changeRd', payload)
    },
    
    async getUserProfile({commit}, user){
      const userProfile  = await fb.usersCollection.doc(user.uid).get()
      commit('setUserProfile', userProfile.data())
      router.push('/dashboard')
    },

    async register({dispatch}, payload){
      const { user } = await fb.auth.createUserWithEmailAndPassword(payload.email, payload.password)
      await fb.usersCollection.doc(user.uid).set({
        username: payload.username
      })
      dispatch('getUserProfile', user)
    },

    async login({dispatch}, payload){
      const { user } = await fb.auth.signInWithEmailAndPassword(payload.email, payload.password)
      dispatch('getUserProfile', user)
    },

    async logout({commit}){
      await fb.auth.signOut()
      commit('setUserProfile', {})
      router.push('/')
    }
  },

  getters: {

  },

  modules: {
  
  },
})
