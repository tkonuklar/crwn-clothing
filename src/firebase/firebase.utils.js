import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyDgnc7SLoBCzldi1ZFKqEE3kDZoGSeWz14567",
  authDomain: "crwn-db-12472567.firebaseapp.com",
  databaseURL: "https://crwn-db-12472.firebaseio.com",
  projectId: "crwn-db-12472",
  storageBucket: "crwn-db-12472456.appspot.com",
  messagingSenderId: "63986540944567",
  appId: "1:63986540944:web:88ec9c43ec759069f2d315567",
  measurementId: "G-Z7E3QZTWR1567"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
//What this means is that we want to always trigger the Google pop up when ever we use this Google auth
provider.setCustomParameters({ prompt: "select_account" });
// that calls off dot sign in with pop up because sign and with pop up takes this provider class that we
//made but it takes it for many different types of pop ups right.
//We just want the Google want but there's a Twitter one right.
//There's all kinds available to us in our sign in but we just set we want to set sign on with pop up
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
