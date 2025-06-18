import './assets/main.css'
import './assets/tailwind.css';


import { createApp, h, provide } from 'vue'
import App from './App.vue'
// @ts-ignore
import router from './router';
import { createPinia, getActivePinia } from 'pinia';
import apolloClient from './apollo.js'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { useAuthStore } from './store/auth'

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});
// ピニアが有効な場合のみ使う
if (getActivePinia()) {
  const authStore = useAuthStore()
  //  Firebaseのログイン状態の復元
  authStore.initAuth().then(() => {
    //  ログイン状態が復元されてからアプリ起動
    app.mount('#app')
  })
}

app.use(router) // Vue Router を適用
app.use(createPinia()); // Pinia を登録
app.mount('#app')


