<template>
  <!-- <header class="w-full p-4 bg-white shadow flex justify-between items-center"></header> -->
  <div class="flex">
    <div class="h-6 font-bold text-lg text-blue-600">UI Labo。</div>
    <div>
      <Bars3Icon
        class="w-5 h-8 ml-1 text-gray-600 cursor-pointer"
        @click="emit('update:show', !show)"
      />
    </div>

    <div class="flex-grow"></div>
    <div class="pr-4"><Login /></div>

    

    <!-- //プルダウンの表示 -->
    <!-- <div class="ml-auto"> -->
      <!-- 3点リーダーアイコン -->
      <EllipsisVerticalIcon
        class="h-6 w-6 text-gray-600 cursor-pointer"
        @click.stop="toggleMenu(1)"
      />

      <!-- ポップアップメニュー -->
       
      <!-- v-if="showMenu === c.id" -->
      <div
        v-if="true"
        class="border"
      >
      ボタン
        <!-- <button
          v-if="editingIndex !== c.id"
          class="text-sm text-gray-700 hover:bg-gray-100"
        >
          編集
        </button>
        <button
          v-if="editingIndex === c.id"
          @click="editingIndex = null"
          class="text-sm text-gray-700 hover:bg-gray-100"
        >
          キャンセル
        </button> -->
      </div>
    <!-- </div> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Bars3Icon } from '@heroicons/vue/24/outline'
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
</script>
<style>
.cursor-pointer {
  cursor: pointer !important;
}
</style>
