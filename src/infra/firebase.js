// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpFWnbBVDnLDuJXqhOSJdUIYMbGvsIuyU",
  authDomain: "sistema-de-compras-43166.firebaseapp.com",
  projectId: "sistema-de-compras-43166",
  storageBucket: "sistema-de-compras-43166.appspot.com",
  messagingSenderId: "78968890548",
  appId: "1:78968890548:web:c59f8d8b7832bd81e923e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
export const db = getFirestore(app);