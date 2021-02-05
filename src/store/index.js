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
    favItems: [],
    cartItems: [],
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
    setFavItems(state, payload){
      state.favItems = payload
    },
    setCartItems(state, payload){
      state.cartItems.push(payload)
    },
    settledCartItems(state, payload){
      state.cartItems = payload
    }
  },
  
  actions: {
    //Manage login,register,logout,auth
    async getUserProfile({commit}, payload){
      const userProfile  = await fb.usersCollection.doc(payload.uid).get()
      commit('setUserProfile', userProfile.data())
      if (router.currentRoute.path === '/'){
        router.push('/dashboard')
      }
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
    async getFavItems({commit}){
      try {
        //get data once
        const likesQuery = await fb.likesCollection.where('userId', '==', fb.auth.currentUser.uid).get()
        const myItems = []
        likesQuery.forEach (async (doc)  => {
          const itemsQuery = await fb.itemsCollection.doc(doc.data().itemId).get()
          const cartQuery = await fb.cartCollection.doc(fb.auth.currentUser.uid + doc.data().itemId).get()
          let img = ''
          if (itemsQuery.data().image){
            img = await fb.storage.ref().child(itemsQuery.data().image).getDownloadURL()
          }
          const authorQuery = await fb.usersCollection.doc(itemsQuery.data().userId).get()
          let item = {
                id: itemsQuery.id,
                name: itemsQuery.data().name,
                description: itemsQuery.data().description,
                price: itemsQuery.data().price,
                createdOn: itemsQuery.data().createdOn,
                likes: itemsQuery.data().likes,
                image: img,
                img: itemsQuery.data().image,
                author: authorQuery.data().username,
                likedItems: {
                  itemId: (doc.exists) ? doc.data().itemId : null,
                  userId: (doc.exists) ? doc.data().userId : null,
                },
                cartedItems: {
                  itemId: (cartQuery.exists) ? cartQuery.data().itemId : null,
                  userId: (cartQuery.exists) ? cartQuery.data().userId : null,
                }
          }
          myItems.push(item)
        })
        commit('setFavItems', myItems)
        }catch(error) {
          console.log(error);
        }
    },
    async getCartItems({commit}){
      try {
        const myItems = []
        const cartQuery = await fb.cartCollection.where('userId', '==', fb.auth.currentUser.uid).get()
        cartQuery.forEach(async (doc)=> {
          const itemKu = await fb.itemsCollection.doc(doc.data().itemId).get()
          let img = ''
          if (itemKu.data().image){
            img = await fb.storage.ref().child(itemKu.data().image).getDownloadURL()
          }
          const authorQuery = await fb.usersCollection.doc(itemKu.data().userId).get()
          let item = {
            id: itemKu.id,
            name: itemKu.data().name,
            description: itemKu.data().description,
            price: itemKu.data().price,
            createdOn: itemKu.data().createdOn,
            likes: itemKu.data().likes,
            image: img,
            img: itemKu.data().image,
            author: authorQuery.data().username,
          }
          myItems.push(item)
        })
        commit('settledCartItems', myItems)
      } catch (error) {
        console.log(error);
      }
        
    },

    async addToCart ({commit}, item) {

      const userId = fb.auth.currentUser.uid
      const docId = userId + item.id
      const doc = await fb.cartCollection.doc(docId).get()
      // check if user has likedItems item
      if (doc.exists) { 
        // delete item
        await fb.cartCollection.doc(docId).delete()
        this.state.favItems[item.index].cartedItems.itemId = null;
        this.state.favItems[item.index].cartedItems.userId = null;
        this.state.cartItems.splice([item.index], 1)
      }else{
        // create item
        await fb.cartCollection.doc(docId).set({
          itemId: item.id,
          userId: userId
        })
        const itemKu = await fb.itemsCollection.doc(item.id).get()
        let img = ''
        if (itemKu.data().image){
          img = await fb.storage.ref().child(itemKu.data().image).getDownloadURL()
        }
        const authorQuery = await fb.usersCollection.doc(itemKu.data().userId).get()
        let itemH = {
          id: item.id,
          name: itemKu.data().name,
          description: itemKu.data().description,
          price: itemKu.data().price,
          createdOn: itemKu.data().createdOn,
          likes: itemKu.data().likes,
          image: img,
          img: itemKu.data().image,
          author: authorQuery.data().username,
        }
        commit('setCartItems', itemH)
        this.state.favItems[item.index].cartedItems.itemId = item.id;
        this.state.favItems[item.index].cartedItems.userId = userId;
      }
    },

     /* eslint-disable */
     async likeItem ({commit}, item) {
      const userId = fb.auth.currentUser.uid
      const docId = userId + item.id
      const doc = await fb.likesCollection.doc(docId).get()
      // check if user has likedItems item
      if (doc.exists) { 
        // delete item
        await fb.likesCollection.doc(docId).delete()
        // update item likes count
        fb.itemsCollection.doc(item.id).update({
          likes: item.likesCount - 1
        })
        //changes in latestArt page
        this.state.allItems[item.index].likes = item.likesCount - 1;
        this.state.allItems[item.index].likedItems.itemId = null;
        this.state.allItems[item.index].likedItems.userId = null;
        //delete from favItems page
        this.state.favItems.splice([item.index], 1)
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
        //changes in latestArt page
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
