import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAENLFRQlL78kVFLceHMoJ2Z7oI27JFaEY",
  authDomain: "movie-app-c8175.firebaseapp.com",
  projectId: "movie-app-c8175",
  appId: "1:331739411097:web:e66800bfe835f2c5cafe08",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
