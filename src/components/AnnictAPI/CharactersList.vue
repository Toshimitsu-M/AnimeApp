<template>
  キャラクター一覧の情報が表示されます。
  <div id="app" class="p-6 flex flex-col items-center">
    <div v-if="loading" class="text-center text-gray-500">Loading...</div>
    <div
      v-else-if="annictCards?.Page.characters.length"
      class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 justify-items-center w-full max-w-screen-lg mx-auto"
    >
      <Card
        v-for="(anime, index) in annictCards?.Page.characters"
        :key="index"
        :title="anime.name?.native"
        :image="anime.image?.large || 'no_image_yoko.jpg'"
        :number="index"
      />
    </div>
    <div v-else class="text-center text-gray-500">データがありません</div>
  </div>
</template>
<script setup lang="ts">
import { watchEffect } from 'vue'
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
        characters: characters[]
      }
    }
  | undefined

type characters = {
  id: number
  name: {
    full: string
    native: string
  }
  image: {
    large: string
  }
  media: {
    id: string
    title: {
      native: string
    }
  }
}

// アニメ一覧クエリの定義
const GET_WORKS = gql`
  query ($search: String) {
    Page(page: 1, perPage: 5) {
      characters(search: $search, sort: [FAVOURITES_DESC]) {
        id
        name {
          full
          native
        }
        image {
          large
        }
        media {
          edges {
            node {
              id
              title {
                native
              }
            }
          }
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
})

// 検索ワードが変わったらクエリを再実行
watchEffect(() => {
  refetch({ search: searchKey.value })
  console.log(searchKey.value)

  // データが取得できたらストアに保存
  if (annictCards.value?.Page?.characters) {
    console.log(annictCards.value)
    store.setAnimeList(
      annictCards.value?.Page?.characters.map((anime) => ({
        title: anime.name.native,
        watchersCount: 0,
        seasonYear: '',
        image: { facebookOgImageUrl: anime.image.large || '' }
      }))
    )
  }
})
</script>
