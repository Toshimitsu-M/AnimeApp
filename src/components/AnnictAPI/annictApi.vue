<script setup lang="ts">
import { ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

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

const fetchdata = ref<Query>()

const getSearchWorks = () => {
  console.log('getSearchWorks')
  const GET_WORKS = gql`
    query {
      searchWorks(
        seasons: ["2024-summer"]
        orderBy: { field: WATCHERS_COUNT, direction: DESC }
        first: 10
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

  const { onResult } = useQuery<Query>(GET_WORKS, {
    fetchPolicy: 'network-only'
  })

  onResult((result) => {
    fetchdata.value = result.data
  })
}
getSearchWorks()

const annictQuery = () => {
  getSearchWorks()
}
</script>

<template>
  <form>
    <!-- <input type="text" placeholder="今期のアニメ" v-model="name" /> -->
    <input type="text" placeholder="今期のアニメ" />
    <input
      type="button"
      value="検索"
      @click="
        () => {
          annictQuery()
        }
      "
    />
  </form>

  <div class="annict-list">
    <!-- ローディング状態 -->
    <div v-if="fetchdata === null">データの読み込み中...</div>
    <!-- データが取得できた場合 -->
    <!-- <div v-else-if="fetchdata?.searchWorks && fetchdata?.searchWorks?.edges.length > 0">
      <p v-for="(edge, index) in fetchdata?.searchWorks?.edges" :key="index">
        {{ edge.node.title }}
        {{ edge.node.watchersCount }}
        {{ edge.node.image.facebookOgImageUrl }}
      </p>
    </div> -->
    <!-- データが空の場合 -->
    <div v-else>データが存在しません</div>
  </div>
</template>
