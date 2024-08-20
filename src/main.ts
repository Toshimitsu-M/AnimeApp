import './assets/main.css'

import { createApp,h,provide } from 'vue'
import App from './App.vue'
import apolloClient from './apollo.js'
import { DefaultApolloClient } from '@vue/apollo-composable'

const app = createApp({
    setup() {
      provide(DefaultApolloClient, apolloClient);
    },
    render: () => h(App),
  });


app.mount('#app')
