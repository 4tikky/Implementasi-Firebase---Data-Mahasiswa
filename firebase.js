// Import fungsi yang kamu butuhkan
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Konfigurasi Firebase-mu (paste dari website Firebase)
const firebaseConfig = {
    apiKey: "AIzaSyB-MlNpR6u85D8pM-i7mtkraYyb1kZNmF4",
    authDomain: "tugasmahasiswafirestore.firebaseapp.com",
    projectId: "tugasmahasiswafirestore",
    storageBucket: "tugasmahasiswafirestore.firebasestorage.app",
    messagingSenderId: "657659325974",
    appId: "1:657659325974:web:d365b0304d1cd13b38cf37",
    measurementId: "G-F51ZBBHRBB"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Ekspor service yang akan kamu pakai di file lain
export const auth = getAuth(app);
export const db = getFirestore(app);