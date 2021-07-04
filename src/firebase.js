import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//utilise
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

//coll ref
const usersCollection = db.collection("users");
const itemsCollection = db.collection("items");
const likesCollection = db.collection("likes");

export { db, auth, storage, usersCollection, itemsCollection, likesCollection };
