// Import Firebase client SDK
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import admin from 'firebase-admin';

import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore';

// Firebase configuration object
const firebaseConfig = {
  apiKey: 'AIzaSyC0-xsw0jVRPc_dc_EuHaTT12c0VuLNox8',
  authDomain: 'article-vue-b9fa7.firebaseapp.com',
  projectId: 'article-vue-b9fa7',
  storageBucket: 'article-vue-b9fa7.appspot.com',
  messagingSenderId: '121155730596',
  appId: '1:121155730596:web:2f269a3c5bc80843a13a31',
};

// Initialize Firebase client SDK
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth, doc, collection, addDoc, setDoc, getDoc, getDocs };
