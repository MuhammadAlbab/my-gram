import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import * as fb from '../firebase'

Vue.use(Vuex)
export default new Vuex.Store({
  
  state: {
    userProfile: {},
    allItems: [],
    itemsByUser: [],
  },

  mutations: {
    //Manage user
    setUserProfile(state, payload){
      state.userProfile = payload
    },
    //Manage data
    setAllItems(state, payload){
      state.allItems = payload
    },
    setItemsByUser(state, payload){
      state.itemsByUser = payload
    },
  },
  
  actions: {
    //Manage login,register,logout,auth
    async getUserProfile({commit}, payload){
      const userProfile  = await fb.usersCollection.doc(payload.uid).get()
      commit('setUserProfile', userProfile.data())
      //catch the NavigationDuplicated exception and ignore it.
      router.push('/dashboard').catch(()=>{})
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
    },
    //Manage data
    async getAllItems({commit}){
      try {
        const myItems = []
        const querySnapShot = await fb.itemsCollection.get()
        querySnapShot.forEach( async (doc) => {
          let img = ''
          if (doc.data().image){
            img = await fb.storage.ref().child(doc.data().image).getDownloadURL()
          }
          const authorQuery = await fb.usersCollection.doc(doc.data().userId).get()
          let item = {
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            price: doc.data().price,
            image: img,
            img: doc.data().image,
            author: authorQuery.data().username
          }
          myItems.push(item)
        })
        commit('setAllItems', myItems)
        }catch(error) {
          console.log(error);
        }
    },
    async getItemsByUser({commit}){
      try {
        const myItems = []
        const querySnapShot = await fb.itemsCollection.where('userId', '==', fb.auth.currentUser.uid).get()
        querySnapShot.forEach( async (doc) => {
            let img = ''
            if (doc.data().image){
                img = await fb.storage.ref().child(doc.data().image).getDownloadURL()
            }
            let item = {
                id: doc.id,
                name: doc.data().name,
                description: doc.data().description,
                price: doc.data().price,
                image: img,
                img: doc.data().image
            }
          myItems.push(item)
        })
        commit('setItemsByUser', myItems)
      }catch (error) {
        console.log(error);
      }
    },
  },

  getters: {

  },

  modules: {

  },
})
