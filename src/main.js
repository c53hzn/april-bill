import { createApp } from 'vue'
import App from './App.vue'
console.log("VITE_projectId="+import.meta.env.VITE_projectId);
createApp(App).mount('#app');