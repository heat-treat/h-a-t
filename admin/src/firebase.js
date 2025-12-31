// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB-0dnT5QALWs8ACiSt9LkYQoPyac-mK3A",
  authDomain: "h-a-t-f6a4f.firebaseapp.com",
  projectId: "h-a-t-f6a4f",
  storageBucket: "h-a-t-f6a4f.firebasestorage.app",
  messagingSenderId: "10226067908",
  appId: "1:10226067908:web:6aec099981aa338aa45c91",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Optional analytics (guarded for environments where it is not supported)
isSupported()
  .then((yes) => {
    if (yes) getAnalytics(app);
  })
  .catch(() => {});
