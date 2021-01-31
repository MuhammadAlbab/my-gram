import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import * as fb from '../firebase'
import {auth} from '@/firebase'

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
        //get data once
        const querySnapshot = await fb.itemsCollection.orderBy('createdOn', 'desc').get()
        const myItems = []
        querySnapshot.forEach( async (doc) => {
          let img = ''
          if (doc.data().image){
            img = await fb.storage.ref().child(doc.data().image).getDownloadURL()
          }
          const authorQuery = await fb.usersCollection.doc(doc.data().userId).get()
          const ownLikes = await fb.likesCollection.doc(auth.currentUser.uid + doc.id).get()
          let item = {
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            price: doc.data().price,
            createdOn: doc.data().createdOn,
            likes: doc.data().likes,
            image: img,
            img: doc.data().image,
            author: authorQuery.data().username,
            likedItems: {
              itemId: (ownLikes.exists) ? ownLikes.data().itemId : null,
              userId: (ownLikes.exists) ? ownLikes.data().userId : null,
            }
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
        //get real time data
        fb.itemsCollection.where('userId', '==', fb.auth.currentUser.uid).orderBy('createdOn', 'desc').onSnapshot(snapshot => {
          const myItems = []
          snapshot.forEach( async (doc) => {
            let img = ''
            if (doc.data().image){
                img = await fb.storage.ref().child(doc.data().image).getDownloadURL()
            }
            let item = {
                id: doc.id,
                name: doc.data().name,
                description: doc.data().description,
                price: doc.data().price,
                createdOn: doc.data().createdOn,
                likes: doc.data().likes,
                image: img,
                img: doc.data().image
            }
            myItems.push(item)
          })
        commit('setItemsByUser', myItems)
        })
      }catch (error) {
        console.log(error);
      }
    },

    /* eslint-disable */
    async likeItem ({commit}, item) {
      const userId = fb.auth.currentUser.uid
      const docId = userId + item.id
      // check if user has likedItems item
      const doc = await fb.likesCollection.doc(docId).get()
      if (doc.exists) { 
        // delete item
        await fb.likesCollection.doc(docId).delete()
        // update item likes count
        fb.itemsCollection.doc(item.id).update({
          likes: item.likesCount - 1
        })
        this.state.allItems[item.index].likes = item.likesCount - 1;
        this.state.allItems[item.index].likedItems.itemId = null;
        this.state.allItems[item.index].likedItems.userId = null;
      }else{
        // create item
        await fb.likesCollection.doc(docId).set({
          itemId: item.id,
          userId: userId
        })
        // update item likes count
        fb.itemsCollection.doc(item.id).update({
          likes: item.likesCount + 1
        })
        this.state.allItems[item.index].likes = item.likesCount + 1;
        this.state.allItems[item.index].likedItems.itemId = item.id;
        this.state.allItems[item.index].likedItems.userId = userId;
      }
    }
  },

  getters: {

  },

  modules: {

  },
})
