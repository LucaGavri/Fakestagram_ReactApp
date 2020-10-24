import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDpDiH2H7Z5e7wz7OAeiM4ajcxicYokL2I",
    authDomain: "fakestagramreactapp.firebaseapp.com",
    databaseURL: "https://fakestagramreactapp.firebaseio.com",
    projectId: "fakestagramreactapp",
    storageBucket: "fakestagramreactapp.appspot.com",
    messagingSenderId: "583569047514",
    appId: "1:583569047514:web:d981d1a0945903d9618ae3",
    measurementId: "G-XZJWV8RMSB"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };