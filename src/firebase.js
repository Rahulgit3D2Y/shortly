import "firebase/firestore";
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA54TJW1UVxGSAQPSsGM9oOdjzf4xabBOY",
  authDomain: "shortly-af7eb.firebaseapp.com",
  projectId: "shortly-af7eb",
  storageBucket: "shortly-af7eb.appspot.com",
  messagingSenderId: "1016727811743",
  appId: "1:1016727811743:web:38d585360c140bd8cfd4aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app); // Initialize Firestore
const auth = getAuth(app); // Initialize Firebase Authentication using getAuth
export{app,firestore,auth};