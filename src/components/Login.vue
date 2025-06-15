<template>
  <div>
    <!-- ログイン前 -->
    <button v-if="!user" class="p-1 text-sm cursor-pointer border rounded" @click="handleLogin">サインイン</button>

    <!-- ログイン時 -->
    <div class="relative inline-block">
    <div v-if="user" class="text-center">
      <img :src="user.photoURL" class="w-8 h-8 rounded-full mx-auto cursor-pointer" @click="toggleMenu"/>
      <!-- ドロップダウンメニュー -->
      <div v-if="showMenu" class="absolute right-0 top-full bg-white border rounded shadow-lg mt-2 w-48">
        <div class="p-2 cursor-pointer hover:bg-gray-100" @click="handleLogout">ログアウト</div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from 'firebase/auth'
import { initializeApp } from 'firebase/app'
// Firebaseの設定（Firebaseコンソールで取得）
const firebaseConfig = {
  apiKey: (import.meta as any).env.VITE_FIREBASE_API_KEY,
  authDomain: (import.meta as any).env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: (import.meta as any).env.VITE_FIREBASE_PROJECT_ID,
  // storageBucket: "your-app.appspot.com",
  // messagingSenderId: "xxxxxxx",
  // appId: "xxxxxxxxxxxxxxxxxxx"
}

// initializeApp を呼び出す（1度だけ）
const firebaseApp = initializeApp(firebaseConfig)

const user = ref<any>(null)

const provider = new GoogleAuthProvider()
const auth = getAuth(firebaseApp)

//ログイン処理
const handleLogin = async () => {
  try {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        // const token = credential.accessToken
        // The signed-in user info.
        user.value = result.user
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        // ...
      })
  } catch (e) {
    console.error('ログイン失敗:', e)
  }
}

// ログアウト処理
const handleLogout = async () => {
  signOut(auth)
    .then(() => {
      user.value = null
    })
    .catch((error) => {
      console.error('ログアウト失敗:', error)
    })
}


// メニューのトグル
const showMenu = ref(false)
const toggleMenu = () => {
  showMenu.value = !showMenu.value
}
</script>
