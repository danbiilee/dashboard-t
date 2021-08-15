import firebase from "firebase/app";
import "firebase/firestore";
import * as process from "../../env";

const firebaseConfig = {
  apiKey: process.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.REACT_APP_FIREBASE_PROJECT_ID,
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
