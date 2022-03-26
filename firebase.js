import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAV9GbaxgWYH7YkSIIXmO-POWEuviCE4Jo",
    authDomain: "productexploreone.firebaseapp.com",
    projectId: "productexploreone",
    storageBucket: "productexploreone.appspot.com",
    messagingSenderId: "295820649154",
    appId: "1:295820649154:web:cb297899ea544952f7d15b",
    measurementId: "G-P1DRTXRNE0"
};
let Firebase;
if (firebase.apps.length === 0) {
    Firebase = firebase.initializeApp(firebaseConfig);
}

export default Firebase;
