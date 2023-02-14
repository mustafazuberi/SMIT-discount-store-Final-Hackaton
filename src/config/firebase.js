import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDoc,
  getDocs,

} from "firebase/firestore";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2tsAGYEZbZeNgt6aFpGJixMPCmF4WF4M",
  authDomain: "smit-discount-store-4f53d.firebaseapp.com",
  projectId: "smit-discount-store-4f53d",
  storageBucket: "smit-discount-store-4f53d.appspot.com",
  messagingSenderId: "588962328355",
  appId: "1:588962328355:web:cb3ae9739061461fc16696",
  measurementId: "G-Z4J7NEPQ2L",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const addUserToDBSignup = async (fullName, contact) => {
  const uid = auth.currentUser.uid;
  var userProfile = { email: "", fullName: "", contact: "" };
  userProfile.email = auth.currentUser.email;
  userProfile.fullName = fullName;
  userProfile.contact = contact;

  return setDoc(doc(db, "users", uid), userProfile);
};












export {
  auth,
  createUserWithEmailAndPassword,
  addUserToDBSignup,
  doc,
  db,
  collection,
  getDocs,
  ref,
  storage,
  uploadBytes,
  getDownloadURL,
  setDoc,
  getDoc,
  onAuthStateChanged
};
