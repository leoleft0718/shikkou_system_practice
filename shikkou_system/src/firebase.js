// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'; // 修正: liteを外す
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZG8NS_nKGh7ContGcCRB1Fc0PJ-oBoT4",
  authDomain: "streamlit-af6e0.firebaseapp.com",
  databaseURL: "https://streamlit-af6e0-default-rtdb.firebaseio.com",
  projectId: "streamlit-af6e0",
  storageBucket: "streamlit-af6e0.appspot.com",
  messagingSenderId: "346611354739",
  appId: "1:346611354739:web:b3bd315a95a437c08c2e06"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
