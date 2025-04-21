<template>
  <div class="relative flex">
    <!-- ヘッダー -->
     
    <Header class=fixed />

    <!-- サイドバー -->
    <div
      v-if="showButton"
      class="fixed w-64 top-12 h-screen bg-white z-20 transform transition-transform duration-300"
      :class="{ '-translate-x-4/5': !show }"
    >
      <Sidebar :show="show" @update:show="show = $event" />
    </div>

    <!-- メインコンテンツ -->
    <div class="flex-1 pl-20 top-12 bg-gray-100 h-screen overflow-auto transition-all duration-300" 
    :class="{ 'pl-64': show, 'pl-0': !show }"
    >
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
// @ts-ignore
import Sidebar from '../components/Sidebar.vue'
// @ts-ignore
import Header from '../components/Header.vue'

// @ts-ignore
const showButton = import.meta.env.VITE_SHOW_BUTTON === 'true';

// @ts-ignore
const show = ref(import.meta.env.VITE_SHOW_BUTTON === 'true')
</script>
