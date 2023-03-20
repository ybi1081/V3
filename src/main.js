import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import LeftMenu from '@/components/LeftMenu.vue'
import BaseInput from '@/components/BaseInput.vue'

const app = createApp(App).use(router)

app.component("LoadingSpinner", LoadingSpinner); // global registration - can be used anywhere
app.component("LeftMenu", LeftMenu); // global registration - can be used anywhere
app.component("BaseInput", BaseInput); // global registration - can be used anywhere
app.mount('#app')
app.config.globalProperties.$axios = axios; 

// [글로벌 사용 설정]
//App.use(globals);
//Vue.prototype.loadingSpinner = LoadingSpinner; 
