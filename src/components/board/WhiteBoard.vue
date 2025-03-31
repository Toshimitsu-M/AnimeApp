<template>
    <div class="w-full max-h-[500px] bg-gray-100 relative overflow-hidden">
      <!-- ホワイトボード -->
      <div ref="board" class="w-full h-full relative">
        <div
          v-for="(icon, index) in icons"
          :key="index"
          class="absolute cursor-pointer w-auto h-auto inline-flex"
          :style="{ top: icon.y + 'px', left: icon.x + 'px' }"
          @pointerdown="onDragStart($event, index)"
        >
          🎯
        </div>
      </div>
      
      <!-- ボタン -->
      <div class="absolute bottom-5 left-5 space-x-2">
        <button @click="addIcon" class="bg-blue-500 text-white px-4 py-2 rounded">アイコン追加</button>
        <button @click="resetIcons" class="bg-red-500 text-white px-4 py-2 rounded">リセット</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  export default {
    setup() {
      const icons = ref([]);
      const draggingIndex = ref(null);
      const offsetX = ref(0);
      const offsetY = ref(0);
  
      onMounted(() => {
        const savedIcons = localStorage.getItem('icons');
        if (savedIcons) {
          icons.value = JSON.parse(savedIcons);
        }
        document.addEventListener('pointermove', onDragMove);
        document.addEventListener('pointerup', onDragEnd);
      });
  
      onUnmounted(() => {
        document.removeEventListener('pointermove', onDragMove);
        document.removeEventListener('pointerup', onDragEnd);
      });
  
      const addIcon = () => {
        icons.value.push({ x: 100, y: 100 });
        saveIcons();
      };
  
      const saveIcons = () => {
        localStorage.setItem('icons', JSON.stringify(icons.value));
      };
  
      const onDragStart = (event, index) => {
        draggingIndex.value = index;
        offsetX.value = event.pageX - icons.value[index].x;
        offsetY.value = event.pageY - icons.value[index].y;
      };
  
      const onDragMove = (event) => {
        if (draggingIndex.value !== null) {
          icons.value[draggingIndex.value].x = event.pageX - offsetX.value;
          icons.value[draggingIndex.value].y = event.pageY - offsetY.value;

          icons.value = [...icons.value];
        }
      };
  
      const onDragEnd = () => {
        if (draggingIndex.value !== null) {
          saveIcons();
          draggingIndex.value = null;
        }
      };
  
      const resetIcons = () => {
        icons.value = [];
        localStorage.removeItem('icons');
      };
  
      return { icons, addIcon, resetIcons, onDragStart };
    },
  };
  </script>
  
  <style>
  button {
    transition: 0.2s;
  }
  button:hover {
    opacity: 0.8;
  }
  </style>
  