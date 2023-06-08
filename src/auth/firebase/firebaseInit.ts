import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyADkPiN1tNqA13BmpN3pzP5l93AgtEIv1c",
    authDomain: "ambigest-d92a3.firebaseapp.com",
    projectId: "ambigest-d92a3",
    storageBucket: "ambigest-d92a3.appspot.com",
    messagingSenderId: "84678773490",
    appId: "1:84678773490:web:16f423a185b2f31df2de6b",
    measurementId: "G-Y83QYL3V7W"
});

const auth = getAuth(firebaseApp);

export default auth;
