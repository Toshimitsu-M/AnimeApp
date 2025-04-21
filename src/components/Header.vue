<template>
    <header class="w-full p-4 bg-white shadow flex justify-between items-center">
      <div class="text-xl font-bold">My App</div>
      <!-- <div>
        <template v-if="user">
          <span class="mr-4">こんにちは、{{ user.displayName }} さん</span>
          <button @click="handleLogout" class="text-sm text-red-500">ログアウト</button>
        </template>
        <template v-else>
          <router-link to="/login" class="text-blue-500 hover:underline">ログイン</router-link>
        </template>
      </div> -->
      <!-- <div class="text-xl font-bold">My App</div> -->
    </header>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue'
//   import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
  
//   const user = ref<any>(null)
//   const auth = getAuth()
  
//   onMounted(() => {
//     onAuthStateChanged(auth, (u) => {
//       user.value = u
//     })
//   })
  
//   const handleLogout = async () => {
//     await signOut(auth)
//   }
  </script>
  