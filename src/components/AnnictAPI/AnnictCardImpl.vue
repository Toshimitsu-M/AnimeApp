<template>
  <div id="app">
    <h1>Card List</h1>
    <!-- <Card
      title="フリーレン"
      image="https://frieren-anime.jp/wp-content/themes/frieren_2023/assets/og/ogp6.jpg"
    ></Card> -->
    <div v-if="annictCards?.searchWorks && annictCards?.searchWorks?.edges.length > 0">
    <Card
      v-for="(card, index) in annictCards.searchWorks?.edges"
      :key="index"
      :title="card.node.title"
      :image="card.node.image.facebookOgImageUrl"
    />
  </div>

    <!-- <div class="card-container">
      <Card
        v-for="(card, index) in cards"
        :key="index"
        :title="card.title"
        :image="card.image"
        :description="card.description"
        :button-text="card.buttonText"
        @button-click="handleButtonClick(card.title)"
      />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from './AnnictCard.vue'
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

  //Annictカードデータの定義
const annictCards = ref<Query>()

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
    annictCards.value = result.data
  })
}
getSearchWorks()

const annictQuery = () => {
  getSearchWorks()
}



// カードデータを定義
const cards = ref([
  {
    title: 'Card 1',
    image: 'https://via.placeholder.com/300',
    description: 'This is the description for card 1.',
    buttonText: 'Read More'
  },
  {
    title: 'Card 2',
    image: 'https://via.placeholder.com/300',
    description: 'This is the description for card 2.',
    buttonText: 'Learn More'
  }
])

// ボタンクリック時の処理
function handleButtonClick(cardTitle: string) {
  console.log(`Button clicked on ${cardTitle}`)
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
