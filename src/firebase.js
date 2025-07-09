import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCS3g8IocOL1UounfHTjNRm1nU2c2G2fqY",
  authDomain: "todoapp-a9a35.firebaseapp.com",
  projectId: "todoapp-a9a35",
  storageBucket: "todoapp-a9a35.firebasestorage.app",
  messagingSenderId: "5368773791",
  appId: "1:5368773791:web:f2142de2671c1a7aadb6aa",
  databaseURL:
    "https://todoapp-a9a35-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
