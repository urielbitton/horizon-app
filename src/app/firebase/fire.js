import firebase from "firebase"
 
const config = {
  apiKey: "AIzaSyBQjj3VWnTzHDUoQPFGbV6ufJbxw8qkgLU",
  authDomain: "horizon-app-fbc9d.firebaseapp.com",
  projectId: "horizon-app-fbc9d",
  storageBucket: "horizon-app-fbc9d.appspot.com",
  messagingSenderId: "578689248315",
  appId: "1:578689248315:web:b0db3d2496b2d38e81801e"
}
const firebaseApp = firebase.initializeApp(config)

const Fire = firebaseApp
const db = firebaseApp.firestore()
const auth = firebaseApp.auth()
const storage = firebaseApp.storage()

export { Fire, db, auth, storage } 
