<script lang="ts">
export default {
  name: 'SearchWorks'
  // その他のコンポーネントオプション
}
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import result from '../../apollo'
import loading from '../../apollo'
import error from '../../apollo'
// import { fetchWorksData } from './searchWorks'

// const works = ref<RootObject | undefined>(undefined)
const works = ref<
  | {
      searchWorks?: {
        edges: {
          node: { annictId: number; title: string; watchersCount: number; seasonYear: number }
        }[]
      }
    }
  | undefined
>(undefined)

// 受け取るJSONデータの型を定義
interface Node {
  annictId: number
  title: string
  watchersCount: number
  seasonYear: number
}

interface Edge {
  node: Node
}

interface SearchWorks {
  edges: Edge[]
}

interface RootObject {
  searchWorks: SearchWorks
}

// interface ResultDataObject {
//   result: any
// }

onMounted(async () => {
  // データの取得
  // works.value = await fetchWorksData()
  // works.value = await result.result.result

  if (works.value && works.value.searchWorks && works?.value.searchWorks?.edges) {
    console.log(works.value.searchWorks.edges[0].node.title)
  } else {
    console.error('データが正しく取得できていないか、プロパティが未定義です')
  }
})

console.log(result)
console.log(loading)
console.log(error)
if (result.result.value && result.result.value.searchWorks) {
  works.value = result.result.value as unknown as RootObject
  console.log(works.value.searchWorks) 
  console.log("タイトル: " + works.value.searchWorks?.edges[0].node.title) // "葬送のフリーレン"
  console.log("視聴回数: " + works.value.searchWorks?.edges[0].node.watchersCount) // "視聴回数"

}
</script>

<template>
  <div id="app">
    <h1>Annictの情報</h1>
    {{ works?.searchWorks?.edges[0].node.title }}
  </div>
  <div>
    <!-- ローディング状態 -->
    <div v-if="works === null">データの読み込み中...</div>
    <!-- データが取得できた場合 -->
    <div v-else-if="works?.searchWorks && works?.searchWorks?.edges.length > 0">
      <p v-for="(edge, index) in works?.searchWorks?.edges" :key="index">
        {{ edge.node.title }}
      </p>
    </div>
    <!-- データが空の場合 -->
    <div v-else>データが存在しません</div>
  </div>
</template>
