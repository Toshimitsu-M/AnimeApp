<template>
  <div class="flex">
    <div class="h-6 font-bold text-lg">UI Labo。</div>
    <div>
      <Bars3Icon class="w-5 h-8 ml-1 text-gray-600 cursor-pointer" @click="emit('update:show', !show)" />
    </div>

    <div class="flex-grow"></div>
    
    <!-- スイッチ本体 -->
    <button
      @click="isDark = !isDark"
      :class="[
        'relative w-15 h-8 rounded-full transition-colors duration-300 focus:outline-none border border-gray-200 cursor-pointer ',
        isDark ? 'bg-gray-800' : 'bg-gray-100'
      ]"
    >
      <!-- サム（アイコン付き） -->
      <div
        :class="[
          'absolute top-[3px] left-1 w-6 h-6 rounded-full shadow-md flex items-center justify-center text-lg transition-all duration-300',
          isDark
            ? 'translate-x-7 bg-white text-gray-800'
            : 'translate-x-0 bg-gray-300 text-white-800'
        ]"
      >
      <component :is="isDark ? MoonIcon : SunIcon" class="w-6 h-6" />
      </div>
      
    </button>

    <div class="ml-5 pr-4">
      <Login />
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { Bars3Icon, MoonIcon, SunIcon } from '@heroicons/vue/24/outline'
import { defineProps, defineEmits } from 'vue'
import Login from '../components/Login.vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  show: Boolean
})

const emit = defineEmits(['update:show'])

const showMenu = ref<number | null>(null)

const toggleMenu = (index: number) => {
  showMenu.value = showMenu.value === index ? null : index
}

// メニューをクリック以外で閉じる
const closeMenu = (event: Event) => {
  // @ts-ignore
  if (!event.target.closest('.menu-container')) {
    showMenu.value = null
  }
}


// ダークモードの状態を管理
const isDark = ref(false)

const updateHtmlClass = (isDark: boolean) => {
  // @ts-ignore
  const html = document.querySelector('html')
  console.log('updateHtmlClass called with isDark:', isDark)
  
  if (html) {
    html.classList.remove('dark')
    if (isDark) {
      html.classList.add('dark')
    }
    console.log('dark class applied:', isDark)
  } else {
    console.warn('html element not found')
  }
}
onMounted(() => updateHtmlClass(isDark.value))
watch(isDark, updateHtmlClass)
</script>
<style>
.cursor-pointer {
  cursor: pointer !important;
}
</style>
