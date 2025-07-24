// utils/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDER6kTJ3Hp_9kbt36RTMWYEOBrx74cIiM",
  authDomain: "bugspedia-54985.firebaseapp.com",
  projectId: "bugspedia-54985",
  storageBucket: "bugspedia-54985.firebasestorage.app",
  messagingSenderId: "459669096219",
  appId: "1:459669096219:web:4e359bdd0f1b835f61f5be",
  measurementId: "G-E94JHW0Q6F",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
