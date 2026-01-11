import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnni2hHgoNYu_ma23miv52wFsUaffrl_0",
  authDomain: "tatetribute-23479.firebaseapp.com",
  // The URL you just confirmed
  databaseURL: "https://tatetribute-23479-default-rtdb.firebaseio.com", 
  projectId: "tatetribute-23479",
  storageBucket: "tatetribute-23479.firebasestorage.app",
  messagingSenderId: "748682137828",
  appId: "1:748682137828:web:030061500334a642881cf1",
  measurementId: "G-VGH1LHD7DZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and export it for use in your pages
export const db = getDatabase(app);