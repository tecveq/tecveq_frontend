import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyCQqKSDVP79V7SqKoN5HPIYhGGFU2aN87U",
//   authDomain: "tca-backend-454ca.firebaseapp.com",
//   projectId: "tca-backend-454ca",
//   storageBucket: "tca-backend-454ca.appspot.com",
//   messagingSenderId: "944167060771",
//   appId: "1:944167060771:web:f6246c1796517c591bb896"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCULmjhz22MAqKgpqjMAewouCSWNdonRWc",
  authDomain: "tcaprod-timetechllc.firebaseapp.com",
  projectId: "tcaprod-timetechllc",
  storageBucket: "tcaprod-timetechllc.firebasestorage.app",
  messagingSenderId: "323045397273",
  appId: "1:323045397273:web:a4c86336cc3817f5bf2b88"
};


const firebase = initializeApp(firebaseConfig);

export default firebase;


// gs://tcaprod-timetechllc.firebasestorage.app/tcsravi