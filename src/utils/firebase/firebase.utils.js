import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDzKLejDtD2wIhAF8gzr83q7JFy0OdJ3u4",
  authDomain: "video-9005a.firebaseapp.com",
  projectId: "video-9005a",
  storageBucket: "video-9005a.appspot.com",
  messagingSenderId: "950387363368",
  appId: "1:950387363368:web:e458f7b2953a44ac07af1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopUp = () => signInWithPopup(auth, googleProvider)

export default app;

