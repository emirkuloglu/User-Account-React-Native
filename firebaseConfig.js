import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'firebase/compat/auth';
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB95gh599kxxkQA_CWrxabhmoqj9oCkWmU",
  authDomain: "project0-fa576.firebaseapp.com",
  projectId: "project0-fa576",
  storageBucket: "project0-fa576.firebasestorage.app",
  messagingSenderId: "539693262698",
  appId: "1:539693262698:web:2d9fe76c92e9ac0c062713"
};


const app = initializeApp(firebaseConfig);

// Firebase Auth'u başlat
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export { app, auth };