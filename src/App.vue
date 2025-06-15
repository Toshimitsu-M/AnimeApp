<script setup lang="ts">
import Default from './layouts/Default.vue'
import { onMounted, ref, watch, nextTick } from 'vue'
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

<template>
      <Default><router-view></router-view></Default>
</template>
<style></style>
