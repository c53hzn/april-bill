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