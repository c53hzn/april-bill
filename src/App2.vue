<template>
  <div id="app">
   {{JSON.stringify(firebaseConfig)}}
  </div>
</template>

<script>
//firebase config start
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore,doc,getDocs,setDoc,deleteDoc,collection  } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
const firebaseConfig = {
  authDomain: process.env.VITE_authDomain,
  projectId: process.env.VITE_projectId,
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const user = auth.currentUser;
var isLoggedin = false;
if (user) {
  // User is signed in, see docs for a list of available properties
  // https://firebase.google.com/docs/reference/js/auth.user
  isLoggedin = true;
}
//firebase config end


export default {
	name: "April-Bill",
	data() {
		return {
      firebaseConfig
		};
  }
};
</script>

<style type="text/css">
</style>