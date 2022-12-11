/*import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { getFirestore } from 'firebase/firestore';
//bd de firebase(firestore)
export const app = firebase.initializeApp({
    "projectId": process.env.REACT_APP_FIREBASE_PROJECTID,
    "storageBucket": process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    "locationId": process.env.REACT_APP_FIREBASE_LOCATIONID,
    "apiKey": process.env.REACT_APP_FIREBASE_APIKEY,
    "authDomain": process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    "messagingSenderId": process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID
  });

 export const db = getFirestore();*/

 // Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

// Añade aquí tus credenciales
const firebaseConfig = {
  "projectId": process.env.REACT_APP_FIREBASE_PROJECTID,
    "storageBucket": process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    "locationId": process.env.REACT_APP_FIREBASE_LOCATIONID,
    "apiKey": process.env.REACT_APP_FIREBASE_APIKEY,
    "authDomain": process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    "messagingSenderId": process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID
};

// Inicializamos la aplicación y la guardamos en firebaseApp
//firebaseApp: configuracion del proyecto
const firebaseApp =  initializeApp(firebaseConfig);//servicio de autenticación firebase

export default firebaseApp;
  