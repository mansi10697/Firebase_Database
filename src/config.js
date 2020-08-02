import Firebase from 'firebase';
let config = {
    apiKey: "AIzaSyDiqhZ9K4eoGs4Hx-0Avvi2MsPqm3VIitI",
    authDomain: "fir-a536b.firebaseapp.com",
    databaseURL: "https://fir-a536b.firebaseio.com",
    projectId: "fir-a536b",
    storageBucket: "fir-a536b.appspot.com",
    messagingSenderId: "114172997686",
    appId: "1:114172997686:web:0241b1acf07a3bc8802897",
    measurementId: "G-8G57YEP5GT"
};
let app = Firebase.initializeApp(config);
export const db = app.database();