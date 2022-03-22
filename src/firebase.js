// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8-4vUszBSNFOLhhuVoetpT586Ihqz4ng",
  authDomain: "wordlewithfriend.firebaseapp.com",
  projectId: "wordlewithfriend",
  storageBucket: "wordlewithfriend.appspot.com",
  messagingSenderId: "290172902128",
  appId: "1:290172902128:web:8dd2300b7d90708095c035",
  measurementId: "G-EJZHNW14TP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);