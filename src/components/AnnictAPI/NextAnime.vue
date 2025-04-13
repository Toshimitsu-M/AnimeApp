<template>
            <!-- N期アニメのランキング -->
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
                  :image="anime.node.image?.facebookOgImageUrl || 'no_image_yoko.jpg'"
                  :number="index"
                />
              </div>
              <div v-else class="text-center text-gray-500">データがありません</div>
            </div>
</template>
<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
import Card from './AnnictCard.vue'
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'
import { useAnimeStore } from '../../store/animeStore' // ストアをインポート

// 検索バーの入力値を保持するためのref
const searchItems = ref<string>('')
const searchKey = ref<string>('')

// クリック時に key を更新
const performSearch = () => {
  console.log(searchItems.value) // 現在の検索バーの値をコンソールに出力
  searchKey.value = searchItems.value
}

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

// Pinia ストア
const store = useAnimeStore()

//次のシーズンを計算
const getNextSeason = () => {
  const currentMonth = new Date().getMonth() + 1; // 現在の月 (1~12)
  let year = new Date().getFullYear();

  const seasonMap = [
    'winter', 'winter', 'winter',  // 1月, 2月, 3月
    'spring', 'spring', 'spring',  // 4月, 5月, 6月
    'summer', 'summer', 'summer',  // 7月, 8月, 9月
    'fall', 'fall', 'fall'         // 10月, 11月, 12月
  ];

  // 3ヶ月後のシーズンを計算
  let nextMonth = currentMonth + 3;
  if (nextMonth > 12) {
    nextMonth -= 12;
    year += 1; // 年を繰り上げる
  }

  console.log(year +"年"+ nextMonth + "月")
  return `${year}-${seasonMap[nextMonth - 1]}`;
};


const season = ref<string>(getNextSeason())
const first = ref<number>(50)

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
