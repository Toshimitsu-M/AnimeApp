<template>
    N期アニメの情報が表示されます。
    <br>
    検索のヒント
            <div id="app" class="p-6 flex flex-col items-center">
              <div v-if="loading" class="text-center text-gray-500">Loading...</div>
              <div
                v-else-if="annictCards?.searchWorks.edges.length"
                class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 justify-items-center w-full max-w-screen-lg mx-auto"
              >
                <Card
                  v-for="(anime, index) in annictCards?.searchWorks.edges"
                  :key="index"
                  :title="anime.node.title"
                  :image="anime.node.image.facebookOgImageUrl || 'no_image_yoko.jpg'"
                  :number="index"
                />
              </div>
              <div v-else class="text-center text-gray-500">データがありません</div>
            </div>
</template>
<script setup lang="ts">
import { ref, watch, watchEffect, computed } from 'vue'
import Card from './AnnictCard.vue'
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'
import { parseDate } from './ParseDate'
import { useAnimeStore } from '../../store/animeStore' 
import { storeToRefs } from 'pinia';


type Query =
  | {
      searchWorks: {
        edges: {
          node: {
            title: string
            watchersCount: number
            seasonYear: string
            image: { facebookOgImageUrl: string }
          }
        }[]
      }
    }
  | undefined

// 検索キーの取得
const store = useAnimeStore()
const { searchKey } = storeToRefs(store);

// デフォルトのシーズンを計算
const getSeason = () => {
  const month = new Date().getMonth() + 1
  const year = new Date().getFullYear()
  const seasonMap = [
    'winter',
    'winter',
    'winter',
    'spring',
    'spring',
    'spring',
    'summer',
    'summer',
    'summer',
    'fall',
    'fall',
    'fall'
  ]
  return `${year}-${seasonMap[month - 1]}`
}

const season = ref<string>(getSeason())
const first = ref<number>(10)

// GraphQL クエリの定義
const GET_WORKS = gql`
  query GetWorks($seasons: [String!], $first: Int!) {
    searchWorks(
      seasons: $seasons
      orderBy: { field: WATCHERS_COUNT, direction: DESC }
      first: $first
    ) {
      edges {
        node {
          title
          watchersCount
          seasonYear
          image {
            facebookOgImageUrl
          }
        }
      }
    }
  }
`

// クエリ実行
const {
  result: annictCards,
  loading,
  refetch
} = useQuery<Query>(GET_WORKS, {
  variables: {
    seasons: [season.value],
    first: first.value
  },
  // fetchPolicy: "network-only",
  fetchPolicy: 'cache-first'
})

// 検索ワードが変わったらシーズンを更新し、クエリを再実行
watchEffect(() => {
  if (searchKey.value) {
    season.value = parseDate(String(searchKey.value))
  }
  refetch({ seasons: [season.value], first: first.value })

  // データが取得できたらストアに保存
  if (annictCards.value?.searchWorks.edges) {
    store.setAnimeList(
      annictCards.value.searchWorks.edges.map((edge) => ({
        title: edge.node.title,
        watchersCount: edge.node.watchersCount,
        seasonYear: edge.node.seasonYear,
        image: { facebookOgImageUrl: edge.node.image.facebookOgImageUrl || '' }
      }))
    )
  }
})

</script>
