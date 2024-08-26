import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCw4uMkc44aVxrkyS64yfHXMz-4ddTMn4A",
  authDomain: "empowerfunds-f2f24.firebaseapp.com",
  projectId: "empowerfunds-f2f24",
  storageBucket: "empowerfunds-f2f24.appspot.com",
  messagingSenderId: "924052530304",
  appId: "1:924052530304:web:db2b8de80e3f7540aa3265",
  measurementId: "G-4FBPRBEZTT"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);//
export default firebaseApp;
