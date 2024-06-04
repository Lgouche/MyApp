import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD0OUlExsGdGr6r8VhSiGVOyvGY7lo2NoY",
  authDomain: "test-c40ad.firebaseapp.com",
  projectId: "test-c40ad",
  storageBucket: "test-c40ad.appspot.com",
  messagingSenderId: "1030583430867",
  appId: "1:1030583430867:web:19f44491232846729cee26"
};

const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);

export { appFirebase, db };
