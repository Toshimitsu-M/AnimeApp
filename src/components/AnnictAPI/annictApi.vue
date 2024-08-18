<script lang="ts">
export default {
  name: 'AnnictApi'
  // その他のコンポーネントオプション
}
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// import {resultQuery} from '../../apollo'
import { fetchItems } from '../../apollo'
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
// interface Node {
//   annictId: number
//   title: string
//   watchersCount: number
//   seasonYear: number
// }

// interface Edge {
//   node: Node
// }

// interface SearchWorks {
//   edges: Edge[]
// }

// interface RootObject {
//   searchWorks: SearchWorks
// }

const result = ref()
async function fetchAndLog() {
  try {
    const fetchItem = fetchItems() // Promise の解決を待つ
    const item = Promise.resolve(fetchItem)
    console.log(item)
    const items = await fetchItems
    // `RefImpl` 内の実際の値にアクセス
    // const actualValue = items
    // console.log(actualValue) // `RefImpl` 内のデータ
    result.value = fetchItem.value
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
fetchAndLog()

// result.then(result => {
// //   console.log(result); // RefImpl の中の値が表示される
// })
// console.log(result.value)
// console.log(result.result.value)
// works.value = result.result.value as unknown as RootObject
if (works.value && works.value.searchWorks) {
  console.log(works.value.searchWorks)
  console.log('タイトル: ' + works.value.searchWorks?.edges[0].node.title) // "葬送のフリーレン"
  console.log('視聴回数: ' + works.value.searchWorks?.edges[0].node.watchersCount) // "視聴回数"
}

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
