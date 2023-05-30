// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbVEl5lQxM4IPTdpEuKFCzl3Bgn1Wk21k",
  authDomain: "eventapp-bbafa.firebaseapp.com",
  databaseURL:
    "https://eventapp-bbafa-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "eventapp-bbafa",
  storageBucket: "eventapp-bbafa.appspot.com",
  messagingSenderId: "784647955966",
  appId: "1:784647955966:web:1832fca30d376c2a988caf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();
