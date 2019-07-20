import firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from './configs/firebase-config.js';
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();