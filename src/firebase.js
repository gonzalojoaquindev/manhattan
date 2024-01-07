import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyA9A2xJLW1bxSGY-GmvX7LxfZSiBb5iIWs",
    authDomain: "skipkiu.firebaseapp.com",
    projectId: "skipkiu",
    storageBucket: "skipkiu.appspot.com",
    messagingSenderId: "833780774883",
    appId: "1:833780774883:web:4994189efd186e318292d6",
    measurementId: "G-5Z31NJRR3R"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, db, analytics }