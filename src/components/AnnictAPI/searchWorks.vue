<script setup lang="ts">
import { ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const name = ref<string>()

type Query =
  | {
      searchWorks: {
        edges: { node: { title: string, watchersCount: number, seasonYear:string } }[]
      }
    }
  | undefined

const fetchdata = ref<Query>()


const getSearchWorks = () => {
  console.log('getSearchWorks')
  const GET_WORKS = gql`
    query {
      searchWorks(
        seasons: ["2023-autumn"]
        orderBy: { field: WATCHERS_COUNT, direction: DESC }
        first: 3
      ) {
        edges {
          node {
            title
            watchersCount
            seasonYear
          }
        }
      }
    }
  `

  const { onResult } = useQuery<Query>(GET_WORKS, {
    fetchPolicy: 'network-only'
  })

  onResult((result) => {
    // fetchdata.value = { pokemons: [result.data.pokemon] }
    fetchdata.value = result.data
  })
}

const annictQuery = () => {
  getSearchWorks()
}

// console.log('タイトル: ' + works.value.searchWorks?.edges[0].node.title) // "葬送のフリーレン"
// console.log('視聴回数: ' + works.value.searchWorks?.edges[0].node.watchersCount) // "視聴回数"
</script>

<template>
  <div id="app">
    <h1>Annictの情報</h1>
  </div>
  <div>
    <form>
      <input type="text" placeholder="Name" v-model="name" />
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
    <pokemon-list v-if="fetchdata" :searchWorks="fetchdata.searchWorks" />
  </div>
</template>
