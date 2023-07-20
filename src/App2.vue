<template>
  <div id="app">
   {{JSON.stringify(firebaseConfig)}}
  </div>
</template>

<script>
//firebase config start
const firebaseConfig = {
  authDomain: process.env.VITE_authDomain,
  projectId: process.env.VITE_projectId,
};

console.log("asdf")

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