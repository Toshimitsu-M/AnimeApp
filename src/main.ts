import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import apolloProvider from './apollo.js'

createApp(App).use(apolloProvider).mount('#app')
