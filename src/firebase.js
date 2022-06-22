import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

console.log(firebase.auth) // Undefined
console.log(firebase.default.auth) // Function


/* 
   1.Used npm i firebase and imported firebase
   2.Used the variable names assigned in .env.local instead of hardcoding
   3.Exported auth and the default app
*/ 

const app = firebase.initializeApp({
    apiKey: "AIzaSyCXcagaVemfRJhP_lQUolZq1JP_c72_dFw",
    authDomain: "auth-verse-dev.firebaseapp.com",
    projectId: "auth-verse-dev",
    storageBucket: "auth-verse-dev.appspot.com",
    messagingSenderId: "1046723195012",
    appId: "1:1046723195012:web:d95231e38f9bb38a3552d1"
})

export const auth = app.auth()
export default app