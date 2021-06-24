import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAs7y1lJFm8g_-mrI3AUKaHSsq--CFUQr8",
    authDomain: "galeria3d-f45b9.firebaseapp.com",
    projectId: "galeria3d-f45b9",
    storageBucket: "galeria3d-f45b9.appspot.com",
    messagingSenderId: "718708474823",
    appId: "1:718708474823:web:f1e86e5487f4d2dc6d8fe2"
  };

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app(); 

const storage = firebase.storage();

export {storage, firebase as default};