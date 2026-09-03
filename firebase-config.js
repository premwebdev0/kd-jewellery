// Firebase SDK CDN se import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBhW_ij1cpt-1qjPJsjpFTWxl1K2LNeLeY",
  authDomain: "kd-jewellery-1e766.firebaseapp.com",
  projectId: "kd-jewellery-1e766",
  storageBucket: "kd-jewellery-1e766.firebasestorage.app",
  messagingSenderId: "142900460959",
  appId: "1:142900460959:web:b08820154add74e811d1aa"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);