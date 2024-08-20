<script lang="ts">
export default {
  name: 'CharactersList'
  // その他のコンポーネントオプション
}
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Characters {
  data: { searchCharacters: SearchCharacters }
}

interface SearchCharacters {
  edges: Node[]
}

interface Node {
  name: string
  series: { id: number; name: string }
}

const characters = ref<Characters | null>(null)

onMounted(async () => {
  try {
    // JSONファイルからデータを取得
    const response = await fetch('/AnimeApp/outputCharacters.json')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    characters.value = data as Characters
  } catch (error) {
    console.error('Error fetching the JSON data:', error)
  }
})
</script>

<template>
  <div>
    <h1>Characters</h1>
    <ul v-if="characters && characters.data && characters.data.searchCharacters">
      <li>リストです。</li>
      <li v-for="node in characters.data.searchCharacters.edges" :key="node.name">
        <div v-if="node.name">{{ node.name }}</div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* スタイルはここに記述します */
</style>
