import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBfhc7FH_YsNAkhH9--zSM9AhrAeAgc5rM",
    authDomain: "cnweb-eb7f0.firebaseapp.com",
    projectId: "cnweb-eb7f0",
    storageBucket: "cnweb-eb7f0.appspot.com",
    messagingSenderId: "210269192640",
    appId: "1:210269192640:web:a778b65051c416e6158825"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
