<template>
  <div id="app">
    <h1>人気順</h1>
    <div
      class="card-container"
      v-if="annictCards?.searchWorks && annictCards?.searchWorks?.edges.length > 0"
    >
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
import { gql } from '@apollo/client/core'
import { parseDate } from './ParseDate'

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

const getSearchWorks = (season: string, first: number) => {
  console.log('getSearchWorks')
  const GET_WORKS = gql`
    query {
      searchWorks(
        seasons: ["${season}"]
        orderBy: { field: WATCHERS_COUNT, direction: DESC }
        first: ${first}
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
    // variables: {
    //   seasons: [season.value],
    //   first: first.value
    // }
  })

  onResult((result) => {
    annictCards.value = result.data
  })
}

// 親コンポーネントから渡されるプロパティを定義
const props = defineProps({
  searchKey: {
    type: String, // 受け取るデータの型を指定（例: String, Number, Object など）
    required: true // このプロパティは必須であることを指定
  }
})

console.log(props.searchKey)
// const searchKey = ref<string>()

const today = new Date()
let year = today.getFullYear()
let fourSeason: number | string = today.getMonth() + 1
if (fourSeason === (1 || 2 || 3)) {
  fourSeason = 'winter'
} else if (fourSeason === 4 || fourSeason === 5 || fourSeason === 6) {
  fourSeason = 'spring'
} else if (fourSeason === 7 || fourSeason === 8 || fourSeason === 9) {
  fourSeason = 'summer'
} else if (fourSeason === 10 || fourSeason === 11 || fourSeason === 12) {
  fourSeason = 'winter'
}


const season = ref<string>(`${year}-${fourSeason}`)
const first = ref<number>(10)
if (props.searchKey !== undefined) {
  season.value = parseDate(props.searchKey)
}

getSearchWorks(season.value, first.value)

const annictQuery = () => {
  // getSearchWorks(
}

// ボタンクリック時の処理
function handleButtonClick(cardTitle: string) {
  console.log(`Button clicked on ${cardTitle}`)
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 6px;
  /* display: flex;
  flex-wrap: wrap; */
}
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  text-align: center;
}

/* @media (min-width: 768px) {
  .card-container {
    display: grid;
  }
} */
</style>
