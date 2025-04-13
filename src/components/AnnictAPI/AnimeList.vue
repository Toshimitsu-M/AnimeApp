<template>
  アニメ作品一覧の情報が表示されます。
  <div id="app" class="p-6 flex flex-col items-center">
    <div v-if="loading" class="text-center text-gray-500">Loading...</div>
    <div
      v-else-if="annictCards?.Page.media.length"
      class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 justify-items-center w-full max-w-screen-lg mx-auto"
    >
      <Card
        v-for="(anime, index) in annictCards?.Page.media"
        :key="index"
        :title="anime.title?.native"
        :image="anime.coverImage?.large || 'no_image_yoko.jpg'"
        :number="index"
      />
    </div>
    <div v-else class="text-center text-gray-500">データがありません</div>
  </div>
</template>
<script setup lang="ts">
import { watch, watchEffect } from 'vue'
import Card from './AnnictCard.vue'
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'
import { useAnimeStore } from '../../store/animeStore' // ストアをインポート
import { storeToRefs } from 'pinia'

// 検索キーの取得
const store = useAnimeStore()
const { searchKey } = storeToRefs(store)

type Query =
  | {
      Page: {
        media: Anime[]
      }
    }
  | undefined

type Anime = {
  id: number
  title: {
    native: string
  }
  coverImage: {
    large: string
  }
}

// アニメ一覧クエリの定義
const GET_WORKS = gql`
  query ($search: String) {
    Page(page: 1, perPage: 50) {
      media(search: $search, type: ANIME, sort: [POPULARITY_DESC]) {
        id
        title {
          native
        }
        coverImage {
          large
        }
      }
    }
  }
`

// クエリ実行 (最初は title が空のため、skip させる)
const {
  result: annictCards,
  loading,
  refetch
} = useQuery<Query>(GET_WORKS, {
  variables: {
    search: searchKey.value || '' // 初回で `undefined` にならないように空文字
  },
  fetchPolicy: 'network-only'
//   fetchPolicy: 'cache-first'
})

// 検索ワードが変わったらクエリを再実行
watchEffect(() => {
  refetch({ search: searchKey.value })
  console.log(searchKey.value)

  // データが取得できたらストアに保存
  if (annictCards.value?.Page?.media) {
    console.log(annictCards.value)
    store.setAnimeList(
      annictCards.value?.Page?.media.map((anime) => ({
        title: anime.title.native,
        watchersCount: 0,
        seasonYear: '',
        image: { facebookOgImageUrl: anime.coverImage.large || '' }
      }))
    )
  }
})
</script>
