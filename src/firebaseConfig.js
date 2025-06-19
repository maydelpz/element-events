import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCLMs0PcR_xxb6xIplactbNJeLNWkBXud8",
  authDomain: "ibs-prueba.firebaseapp.com",
  projectId: "ibs-prueba",
  storageBucket: "ibs-prueba.firebasestorage.app",
  messagingSenderId: "1039291654248",
  appId: "1:1039291654248:web:ae97bf38ef58b6b01e9bdd"
};

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
