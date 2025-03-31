<template>
  <div
    class="w-full h-screen bg-gray-100 relative overflow-hidden"
    @drop="onDrop"
    @dragover.prevent
  >
    <div
      v-for="(card, key) in cards"
      :key="key"
      class="absolute bg-blue-500 text-white px-4 py-2 rounded"
      :style="{ top: card.y + 'px', left: card.x + 'px' }"
      :draggable="editMode.key !== key"
      @dragstart="editMode.key !== key ? onDragStart($event, key) : null"
    >
      <!-- 編集モード -->
      <template v-if="editMode.key === key">
        <textarea v-model="cards[key].t" @blur="editMode.key = ''"></textarea>
      </template>
      <!-- 通常表示モード -->
      <template v-else>
        <div @click="editMode.key = key">{{ card.t }}</div>
      </template>
    </div>
  </div>
</template>

<script>
import { ref, reactive} from 'vue'

export default {
  setup() {
    const cards = reactive({
      id1: { t: "Wash", x: 100, y: 100 },
      id2: { t: "your hands", x: 200, y: 300 }
    })

    const editMode = reactive({ key: ""})
    const offset = ref({ x: 0, y: 0 })

    const onDragStart = (event, key) => {
      offset.value = {
        x: event.clientX - cards[key].x,
        y: event.clientY - cards[key].y
      }
      event.dataTransfer.setData('cardKey', key)
    }

    const onDrop = (event) => {
      event.preventDefault()
      const key = event.dataTransfer.getData('cardKey')
      if (key && cards[key]) {
        cards[key].x = event.clientX - offset.value.x,
        cards[key].y = event.clientY - offset.value.y
      }
    }

    return {cards, editMode, onDragStart, onDrop }
  }
}
</script>

<style>
.cursor-pointer {
  cursor: grab;
}
</style>
