<template>
  <div>
    <!-- ログイン前 -->
    <button v-if="!user" class="p-1 text-sm cursor-pointer border rounded" @click="auth.handleLogin">サインイン</button>

    <!-- ログイン時 -->
    <div class="relative inline-block">
    <div v-if="user" class="text-center">
      <img :src="user.photoURL" class="w-8 h-8 rounded-full mx-auto cursor-pointer" @click="toggleMenu"/>
      <!-- ドロップダウンメニュー -->
      <div v-if="showMenu" class="absolute right-0 top-full bg-white border rounded shadow-lg mt-2 w-48">
        <div class="p-2 cursor-pointer hover:bg-gray-100" @click="auth.handleLogout">ログアウト</div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'

const auth = useAuthStore()
const user = ref<any>(null)
user.value = auth.user

// メニューのトグル
const showMenu = ref(false)
const toggleMenu = () => {
  showMenu.value = !showMenu.value
}
</script>
