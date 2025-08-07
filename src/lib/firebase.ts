
// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCN-JN5O2ZpsA30B4sTgiS9Z4JPGnx9f0",
  authDomain: "my-portfolio-5qdx9.firebaseapp.com",
  projectId: "my-portfolio-5qdx9",
  storageBucket: "my-portfolio-5qdx9.firebasestorage.app",
  messagingSenderId: "147079995859",
  appId: "1:147079995859:web:100f22e213f95a2f1b0f26"
};


// Initialize Firebase
let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0];
}

const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
