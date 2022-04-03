import { createApp } from 'vue'
import useVuelidate from '@vuelidate/core'
import App from './App.vue'
import router from './router'
import store from './store'

// styles
import '@/assets/styles/style.scss'
createApp(App).use(useVuelidate)
createApp(App).use(store).use(router).mount('#app')
