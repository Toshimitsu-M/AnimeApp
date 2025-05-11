<template>
  <div>
  <!-- <div class="flex flex-col items-center justify-center min-h-screen"> -->
    <button class="text-blue-500 text-sm cursor-pointer" @click="handleLogin">
      Sign Up
    </button>

    <div v-if="user" class="mt-4 text-center">
        <!-- 不滅のキュレル -->
      <p>こんにちは、{{ user.displayName }} さん</p> 
      <!-- アイコン -->
      <img :src="user.photoURL" class="w-16 h-16 rounded-full mx-auto mt-2" />
      <button class="mt-4 text-sm text-red-500" @click="handleLogout">ログアウト</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut
} from 'firebase/auth'
import { initializeApp } from 'firebase/app'
// Firebaseの設定（Firebaseコンソールで取得）
const firebaseConfig = {
  apiKey: 'AIzaSyAFhk42_eWjwzhUsYDedREzSBDWTY0B3rY',
  authDomain: "oauth-c859c.firebaseapp.com",
  projectId: 'oauth-c859c'
  // storageBucket: "your-app.appspot.com",
  // messagingSenderId: "xxxxxxx",
  // appId: "xxxxxxxxxxxxxxxxxxx"
}

// ✅ initializeApp を呼び出す（1度だけ）
const firebaseApp = initializeApp(firebaseConfig)

const user = ref<any>(null)

const provider = new GoogleAuthProvider()
const auth = getAuth(firebaseApp)

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

const handleLogout = async () => {
  signOut(auth)
    .then(() => {
        user.value = null
      // Sign-out successful.
    })
    .catch((error) => {
        console.error('ログアウト失敗:', error)
      // An error happened.
    })
}

//   onAuthStateChanged(auth, (u) => {
//     user.value = u;
//   });
</script>
