import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAESDz-0_lCVOa4PVNRvw7z4IPFgIHJRog",
    authDomain: "reactjs-final-assigment.firebaseapp.com",
    databaseURL: "https://reactjs-final-assigment-default-rtdb.firebaseio.com",
    projectId: "reactjs-final-assigment",
    storageBucket: "reactjs-final-assigment.appspot.com",
    messagingSenderId: "562714695714",
    appId: "1:562714695714:web:81a8365bf9e2c49ce8527b",
    measurementId: "G-263VX1BGP8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage }
