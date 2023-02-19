// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuiENwyAQrUA7XdLXpWJZAvV4IoykCpJI",
  authDomain: "realtor-clone-react-3c971.firebaseapp.com",
  projectId: "realtor-clone-react-3c971",
  storageBucket: "realtor-clone-react-3c971.appspot.com",
  messagingSenderId: "555114549203",
  appId: "1:555114549203:web:f8a0b01035862124fce926"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()