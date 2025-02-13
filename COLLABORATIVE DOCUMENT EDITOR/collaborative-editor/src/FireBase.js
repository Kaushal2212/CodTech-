import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnBHDkmnDMNipSZPdak7dGlU6bwVmIE2A",
  authDomain: "YOUR_collaborative-editor-e2a4a.firebaseapp.comAUTH_DOMAIN",
  projectId: "collaborative-editor-e2a4a",
  storageBucket: "collaborative-editor-e2a4a.firebasestorage.app",
  messagingSenderId: "616448562341",
  appId: "1:616448562341:web:96413c229b91d1be3ca94c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, doc, setDoc, onSnapshot };
