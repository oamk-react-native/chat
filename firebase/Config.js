import  firebase  from "firebase/compat";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUmBpA_qpcZVorfoNMVahLsoSk25BS82Q",
  authDomain: "react-native-chat-5050b.firebaseapp.com",
  projectId: "react-native-chat-5050b",
  storageBucket: "react-native-chat-5050b.appspot.com",
  messagingSenderId: "436469400448",
  appId: "1:436469400448:web:a59294c2e95c20c137b765"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export { firebase };
export const USERS = 'users';
export const GROUPS = 'groups';
export const DISCUSSIONS = 'discussions';
export const MESSAGES = 'messages'; 

