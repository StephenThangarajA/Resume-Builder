import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCi4Yzxqy3JG1pS3Uq8XqhrEnV3Z_MOln8",
  authDomain: "finalprototype-1xspqk.firebaseapp.com",
  projectId: "finalprototype-1xspqk",
  storageBucket: "finalprototype-1xspqk.appspot.com",
  messagingSenderId: "1941243656",
  appId: "1:1941243656:web:1d7b65258b79a191b14ebd"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth , provider};