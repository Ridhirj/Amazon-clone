import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBpxsbcFF46VcrSZTvwwu9-HBt3xeQK-EY",
  authDomain: "fir-cfd12.firebaseapp.com",
  projectId: "fir-cfd12",
  storageBucket: "fir-cfd12.appspot.com",
  messagingSenderId: "1070007724931",
  appId: "1:1070007724931:web:43ccd442ca5f30b3b864b6",
  measurementId: "G-0QLTGX171B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig;
