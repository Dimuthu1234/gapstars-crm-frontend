import firebase from "firebase/app";
import "firebase/firestore";
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAxRKbjm8kCvD-3ZYnejK8aOQzGqtGWl6k",
  authDomain: "ecom-b4784.firebaseapp.com",
  databaseURL: "https://ecom-b4784.firebaseapp.com",
  projectId: "ecom-b4784",
  storageBucket: "ecom-b4784.appspot.com",
  messagingSenderId: "711627895957",
  appId: "1:711627895957:web:94259756314cac6797579c"
};
// Initialize Firebase
export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

// db = firebase.firestore();

// export const dbOrderRef = db.collection('order');

// export const orderData = db.collection('order').get()
