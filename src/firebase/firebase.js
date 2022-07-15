import firebase from "firebase/compat/app"
import "firebase/compat/firestore";
import "firebase/compat/auth";


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDUHTloCafxOJffNctDWGHQSuVhMlGpG6o",
    authDomain: "easytutshop.firebaseapp.com",
    projectId: "easytutshop",
    storageBucket: "easytutshop.appspot.com",
    messagingSenderId: "1028234324591",
    appId: "1:1028234324591:web:662e81d561f69665d5bb9a"
});

export const db = firebaseApp.firestore();

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
  GoogleProvider.setCustomParameters({prompt:'select_account'});

  
 export const handleUserProfile = async({userAuth,additionalData}) => {
  if (!userAuth) return;
  const {uid} = userAuth;

  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {

    const {displayName,email} = userAuth;
    const timestamp = new Date();
    const userRoles = ['user'];

    try{
      await userRef.set({
        displayName,
        email,
        createdDate: timestamp,
        userRoles,
        ...additionalData
      })
    }catch(err){
      //console.log(err)
    }
  }
  return userRef;
 };

 export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  })
 }