import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "YOUR-API-KEY-HERE",
    authDomain: "YOUR-API-KEY-HERE",
    projectId: "YOUR-API-KEY-HERE",
    storageBucket: "YOUR-API-KEY-HERE",
    messagingSenderId: "YOUR-API-KEY-HERE",
    appId: "YOUR-API-KEY-HERE",
    measurementId: "YOUR-API-KEY-HERE"
};
let Firebase;
if (firebase.apps.length === 0) {
    Firebase = firebase.initializeApp(firebaseConfig);
}

export default Firebase;
