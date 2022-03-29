import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3fNVuDxVtLbwAXymp3swLoxnf3Ot5--0",

  authDomain: "edem-vue3.firebaseapp.com",

  projectId: "edem-vue3",

  storageBucket: "edem-vue3.appspot.com",

  messagingSenderId: "867653529519",

  appId: "1:867653529519:web:445b42484ef2266981895a",

  measurementId: "G-G81J84JXMC",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);



export { auth, db };
