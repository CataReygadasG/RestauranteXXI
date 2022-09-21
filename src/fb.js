import firebase from "firebase/compat/app"
import "firebase/compat/auth"

export const app = firebase.initializeApp({
    "projectId": process.env.REACT_APP_FIREBASE_PROJECTID,
    "storageBucket": process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    "locationId": process.env.REACT_APP_FIREBASE_LOCATIONID,
    "apiKey": process.env.REACT_APP_FIREBASE_APIKEY,
    "authDomain": process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    "messagingSenderId": process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID
  });