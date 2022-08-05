import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import firebaseConfig from './firebaseConfig.js';

const firebaseConfig = JSON.parse(process.env.firebaseConfig)

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;
