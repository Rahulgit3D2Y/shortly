import "firebase/firestore";
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth,connectAuthEmulator } from 'firebase/auth'; 
 
var firebaseConfig = {
  apiKey: "AIzaSyA54TJW1UVxGSAQPSsGM9oOdjzf4xabBOY",
  authDomain: "shortly-af7eb.firebaseapp.com",
  projectId: "shortly-af7eb",
  storageBucket: "shortly-af7eb.appspot.com",
  messagingSenderId: "1016727811743",
  appId: "1:1016727811743:web:38d585360c140bd8cfd4aa"
};
 
const firebase = initializeApp(firebaseConfig);
const firestore = getFirestore(firebase);  
const auth = getAuth(firebase);  


// if (process.env.NODE_ENV === "development") {
//   connectFirestoreEmulator(firestore, 'localhost', 8080);
//   connectAuthEmulator(auth, 'http://localhost:9099');
// }

export{firebase,firestore,auth};