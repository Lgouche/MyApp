import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBoyVd3Ym82oKWVyitx9HHA2wD6NbNwsaY",
  authDomain: "test-e647b.firebaseapp.com",
  projectId: "test-e647b",
  storageBucket: "test-e647b.appspot.com",
  messagingSenderId: "1075808234941",
  appId: "1:1075808234941:web:bb5086addfda4f1b2cb6d4"
};

const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);

export { appFirebase, db };

