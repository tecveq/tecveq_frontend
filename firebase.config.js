import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCQqKSDVP79V7SqKoN5HPIYhGGFU2aN87U",
  authDomain: "tca-backend-454ca.firebaseapp.com",
  projectId: "tca-backend-454ca",
  storageBucket: "tca-backend-454ca.appspot.com",
  messagingSenderId: "944167060771",
  appId: "1:944167060771:web:f6246c1796517c591bb896"
};

const firebase = initializeApp(firebaseConfig);

export default firebase;
