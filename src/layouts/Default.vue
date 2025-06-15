<template>
  <div class="relative">
    <!-- ヘッダー -->
    <!-- //Header.vueのボタンを押下したらサイドバーを開く -->
    <Header
      class="fixed w-full top-0 p-2 z-21 bg-gray-100 dark:bg-gray-800 text-orange-600/80"
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
    <div class="flex-1 pt-12 bg-white dark:bg-gray-700 h-screen overflow-auto transition-all duration-300" 
    :class="{ 'pl-40': show, 'pl-0': !show }"
    >
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
// @ts-ignore
import Sidebar from '../components/Sidebar.vue'
// @ts-ignore
import Header from '../components/Header.vue'

// @ts-ignore
const showButton = import.meta.env.VITE_SHOW_BUTTON === 'true';

// @ts-ignore
const show = ref(import.meta.env.VITE_SHOW_BUTTON === 'true')

// ダークモードの状態を管理
const isDark = ref(false)

const updateHtmlClass = (isDark: boolean) => {
  // @ts-ignore
  const html = document.querySelector('html')
  // @ts-ignore
  console.log('media ' ,window.matchMedia('(prefers-color-scheme: dark)').matches)
  if (html) {
    html.classList.remove('dark')
    if (isDark) {
      html.classList.add('dark')
    }
    console.log('dark class applied:', isDark)
    console.log('html.className:', html.className)
  } else {
    console.warn('html element not found')
  }
}
onMounted(() => {
  nextTick(() => updateHtmlClass(isDark.value))
})
watch(isDark, (val) => {
  nextTick(() => updateHtmlClass(val))
})
</script>
