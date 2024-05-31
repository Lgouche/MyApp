// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0OUlExsGdGr6r8VhSiGVOyvGY7lo2NoY",
  authDomain: "test-c40ad.firebaseapp.com",
  projectId: "test-c40ad",
  storageBucket: "test-c40ad.appspot.com",
  messagingSenderId: "1030583430867",
  appId: "1:1030583430867:web:19f44491232846729cee26"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default  appFirebase