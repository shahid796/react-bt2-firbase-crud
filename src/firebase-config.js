import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBWNm3Shn9-grGtLWzXY6t-4BqV60dR-wU",
    authDomain: "fir-crud2-1b037.firebaseapp.com",
    projectId: "fir-crud2-1b037",
    storageBucket: "fir-crud2-1b037.appspot.com",
    messagingSenderId: "1019314818425",
    appId: "1:1019314818425:web:ea57b40ffc3afc5ce5f3a8",
    measurementId: "G-TLN4M8CJ6Z"
  };

  const app = initializeApp(firebaseConfig)
 export const db = getFirestore(app)