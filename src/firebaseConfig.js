// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzCBOBTLeN17FyjUPMJLINiuhkoxeFeZM",
  authDomain: "crud-40783.firebaseapp.com",
  projectId: "crud-40783",
  storageBucket: "crud-40783.firebasestorage.app",
  messagingSenderId: "207810138393",
  appId: "1:207810138393:web:40a42ae2706bdef4e97588",
  measurementId: "G-0HELT7FEW8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getDatabase(app);
export const auth = getAuth(app);
const analytics = getAnalytics(app);