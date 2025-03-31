import './assets/main.css'
import './assets/tailwind.css';


import { createApp,h,provide } from 'vue'
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia';
import apolloClient from './apollo.js'
import { DefaultApolloClient } from '@vue/apollo-composable'

const app = createApp({
    setup() {
      provide(DefaultApolloClient, apolloClient);
    },
    render: () => h(App),
  });

app.use(router) // Vue Router を適用
app.use(createPinia()); // Pinia を登録
app.mount('#app')

