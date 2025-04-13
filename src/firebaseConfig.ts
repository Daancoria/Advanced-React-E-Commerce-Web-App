import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics"; ASK ALLAN ABOUT IT

const firebaseConfig = {
  apiKey: "AIzaSyClzp60X3oGZK4k75MG8vu7_J8RsF4sNrY",
  authDomain: "ecommerce1-6d2ca.firebaseapp.com",
  projectId: "ecommerce1-6d2ca",
  storageBucket: "ecommerce1-6d2ca.firebasestorage.app",
  messagingSenderId: "551717411221",
  appId: "1:551717411221:web:6b2265f108ed967cb8be9c",
  measurementId: "G-J3GP64Q1PT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app); // ASK ALLAN ABOUT IT

