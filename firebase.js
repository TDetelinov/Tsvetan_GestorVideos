import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsJJaXxP7pa93jKKWZD6dsOIgQdHDoIWc",
  authDomain: "gestor-videos.firebaseapp.com",
  projectId: "gestor-videos",
  storageBucket: "gestor-videos.firebasestorage.app",
  messagingSenderId: "916055775755",
  appId: "1:916055775755:web:752e65c5cb4a3082aa850e",
  measurementId: "G-ED1S8EQJ4F"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);