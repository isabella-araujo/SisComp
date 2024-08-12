// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEfIwiUCPUX5C0trZ7RtjM-73av74sxhI",
  authDomain: "siscomp-901d2.firebaseapp.com",
  projectId: "siscomp-901d2",
  storageBucket: "siscomp-901d2.appspot.com",
  messagingSenderId: "687603179990",
  appId: "1:687603179990:web:c2697a5e9d88f17422c477"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
export const db = getFirestore(app);