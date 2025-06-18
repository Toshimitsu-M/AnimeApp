import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import type { User } from 'firebase/auth'
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
const auth = getAuth(firebaseApp)
const provider = new GoogleAuthProvider()

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const loading = ref(true)

    const initAuth = (): Promise<void> => {
        return new Promise((resolve) => {
            onAuthStateChanged(auth, (u) => {
                user.value = u
                loading.value = false
                resolve()
            })
        })
    }

    //ログイン処理
    const handleLogin = async () => {
        try {
            signInWithPopup(auth, provider)
                .then((result) => {
                    const credential = GoogleAuthProvider.credentialFromResult(result)
                    user.value = result.user
                })
                .catch((error) => {
                    const errorCode = error.code
                    const errorMessage = error.message
                    const email = error.customData.email
                    const credential = GoogleAuthProvider.credentialFromError(error)
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

    return {
        user,
        loading,
        initAuth,
        handleLogin,
        handleLogout,
        isLoggedIn: () => !!user.value
    }
})
