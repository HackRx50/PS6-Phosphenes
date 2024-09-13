import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signOut, GithubAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAcATvLTzTiPX_rFs0H6O-o8xDjU8DCve8",
  authDomain: "hackrx-e3d53.firebaseapp.com",
  projectId: "hackrx-e3d53",
  storageBucket: "hackrx-e3d53.appspot.com",
  messagingSenderId: "150093545946",
  appId: "1:150093545946:web:044133a4ca5b9d0bcc00e3",
  measurementId: "G-B3QVR6RPH3"
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const githubProvider = new GithubAuthProvider();

export { auth, provider, db, signOut,githubProvider };
