<template>
  <div class="relative">
    <!-- ヘッダー -->
    <!-- //Header.vueのボタンを押下したらサイドバーを開く -->
    <Header
      class="fixed w-full top-0 p-2 z-21 bg-gray-100 dark:bg-gray-800 text-orange-600"
      :show="show"
      @update:show="show = $event"
    />

    <!-- サイドバー -->
    <div
      v-if="showButton"
      class="left-0 fixed w-40 top-1 h-screen bg-gray-100 dark:bg-gray-800 z-20 transform transition-transform duration-300"
      :class="{ '-translate-x-[100%]': !show }"
    >
      <Sidebar />
    </div>

    <!-- メインコンテンツ -->
    <div class="flex-1 pt-10 bg-white dark:bg-gray-700 h-screen overflow-auto transition-all duration-300" 
    :class="{ 'pl-64': show, 'pl-0': !show }"
    >
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
// @ts-ignore
import Sidebar from '../components/Sidebar.vue'
// @ts-ignore
import Header from '../components/Header.vue'

// @ts-ignore
const showButton = import.meta.env.VITE_SHOW_BUTTON === 'true';

// @ts-ignore
const show = ref(import.meta.env.VITE_SHOW_BUTTON === 'true')


</script>
