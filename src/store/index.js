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
  },

  mutations: {
    //Manage user
    setUserProfile(state, payload){
      state.userProfile = payload
    },
    //Update Profile
    updatedProfile(state, payload){
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
  },
  
  actions: {
    //Manage login,register,logout,auth, update profile
    async getUserProfile({commit}, payload){
      try {
        const userProfile  = await fb.usersCollection.doc(payload.uid).get()
        let data = {}
        if (userProfile.data().avatar === ''){
          data = {
            avatar: '',
            username: userProfile.data().username,
            bio: userProfile.data().bio,
          }
        }else{
          let img = await fb.storage.ref().child(userProfile.data().avatar).getDownloadURL()
          data = {
            avatar: img,
            username: userProfile.data().username,
            bio: userProfile.data().bio,
          }
        }
        commit('setUserProfile', data)
        if (router.currentRoute.path === '/'){
          router.push('/dashboard/').catch(console.log('Ignore this, Navigation error stuff'))
        }
      }catch(error){
        console.log(error);
      }
      
    },
    async register({dispatch}, payload){
      const { user } = await fb.auth.createUserWithEmailAndPassword(payload.email, payload.password)
      await fb.usersCollection.doc(user.uid).set({
        avatar: '',
        username: payload.username,
        bio: payload.bio,
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

    async updateProfile({commit}, payload){
      if (payload.avatar !== ''){
        let img = await fb.storage.ref().child(payload.avatar).getDownloadURL()
        payload.avatar = img
      }
      commit('updatedProfile', payload)
      
    },
    //Manage data
    async getAllItems({commit}){
      try {
        //get data once
        const querySnapshot = await fb.itemsCollection.where('userId', '!=', fb.auth.currentUser.uid).get()
        const myItems = []
        querySnapshot.forEach( async (doc) => {
          let img = ''
          let myAvatar = ''
          if (doc.data().image){
            img = await fb.storage.ref().child(doc.data().image).getDownloadURL()
          }
          const authorQuery = await fb.usersCollection.doc(doc.data().userId).get()
          if (authorQuery.data().avatar !== '') {
            myAvatar = await fb.storage.ref().child(authorQuery.data().avatar).getDownloadURL()
          }
          const ownLikes = await fb.likesCollection.doc(auth.currentUser.uid + doc.id).get()
          let item = {
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            createdOn: doc.data().createdOn,
            likes: doc.data().likes,
            image: img,
            img: doc.data().image,
            author: authorQuery.data().username,
            avatar: myAvatar,
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
        let myAvatar = ''
        likesQuery.forEach (async (doc)  => {
          const itemsQuery = await fb.itemsCollection.doc(doc.data().itemId).get()
          let img = ''
          if (itemsQuery.data().image){
            img = await fb.storage.ref().child(itemsQuery.data().image).getDownloadURL()
          }
          const authorQuery = await fb.usersCollection.doc(itemsQuery.data().userId).get()
          if (authorQuery.data().avatar !== '') {
            myAvatar = await fb.storage.ref().child(authorQuery.data().avatar).getDownloadURL()
          }
          let item = {
                id: itemsQuery.id,
                name: itemsQuery.data().name,
                description: itemsQuery.data().description,
                createdOn: itemsQuery.data().createdOn,
                likes: itemsQuery.data().likes,
                image: img,
                img: itemsQuery.data().image,
                author: authorQuery.data().username,
                avatar: myAvatar,
                likedItems: {
                  itemId: (doc.exists) ? doc.data().itemId : null,
                  userId: (doc.exists) ? doc.data().userId : null,
                },
          }
          myItems.push(item)
        })
        commit('setFavItems', myItems)
        }catch(error){
          console.log(error);
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
        this.state.favItems.splice(item.id, 1)
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
