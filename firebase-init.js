// Firebase Initialization for FinaFeels (Compat Version)
// This script initializes Firebase so that the global 'firebase' object is available for script.js

const firebaseConfig = {
    apiKey: "AIzaSyBNAiBbjBl7SpqwL0NiJmx3BVuRrd1FVBA",
    authDomain: "finafeels-39852.firebaseapp.com",
    projectId: "finafeels-39852",
    storageBucket: "finafeels-39852.firebasestorage.app",
    messagingSenderId: "962083690885",
    appId: "1:962083690885:web:115469c62f982fa24fccec",
    measurementId: "G-C60L4MRLYR"
};

// Initialize Firebase
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase initialized successfully (Compat Mode)");
} else {
    console.error("Firebase SDK not loaded. Make sure to include firebase-app-compat.js before this script.");
}
