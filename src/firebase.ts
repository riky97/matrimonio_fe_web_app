// Import the functions you need from the SDKs you need
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyAD50SEz-H-FpNX9M5_f-k5WLQEwsfPaXQ",
    authDomain: "matrimonio-fe-web-app.firebaseapp.com",
    projectId: "matrimonio-fe-web-app",
    storageBucket: "matrimonio-fe-web-app.appspot.com",
    messagingSenderId: "855128845599",
    appId: "1:855128845599:web:c04752703ce5b95ccad42a",
    databaseURL: "https://matrimonio-fe-web-app-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Ottieni una referenza al database
const database = getDatabase(app);
const dbRef = ref(database);

export { dbRef, database };