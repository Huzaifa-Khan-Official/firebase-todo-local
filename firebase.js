import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getFirestore, collection, addDoc, doc, onSnapshot, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDnQzns2HMCrsXZu-xGpub510NiH8uokxc",
    authDomain: "todo-firebase4.firebaseapp.com",
    projectId: "todo-firebase4",
    storageBucket: "todo-firebase4.appspot.com",
    messagingSenderId: "366972574475",
    appId: "1:366972574475:web:42cb678bcf2ee52585600e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);



export {app, db, collection, addDoc, doc, onSnapshot, deleteDoc, updateDoc}