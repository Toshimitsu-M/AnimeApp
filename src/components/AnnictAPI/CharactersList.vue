<template>
  <div>
    <h1>Characters</h1>
    <ul>
      <li>
        リストです。
      </li>
      <li v-for="edge in charactersEdges" :key="edge.node">

        <div v-if="edge.node && edge.node.trim() !== ''">{{ edge.node }}</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CharactersList'
  // その他のコンポーネントオプション
}
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const characters = ref()
const charactersEdges = ref([])
onMounted(async () => {
  try {
    // JSONファイルからデータを取得
    const response = await fetch('/AnimeApp/outputCharacters.json')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    characters.value = data
    charactersEdges.value = characters.value.data.searchCharacters.edges

  } catch (error) {
    console.error('Error fetching the JSON data:', error)
  }
})


// export default defineComponent({
//   name: 'CharactersList'
//   // その他のコンポーネントオプション
// })
</script>

<style scoped>
/* スタイルはここに記述します */
</style>
