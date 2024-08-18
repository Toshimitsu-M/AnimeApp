import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core'
import { createHttpLink } from '@apollo/client/link/http'
import { useQuery, provideApolloClient } from '@vue/apollo-composable'
import { ref } from 'vue'

const GET_WORKS = gql`
  query {
    searchWorks(
      seasons: ["2023-autumn"]
      orderBy: { field: WATCHERS_COUNT, direction: DESC }
      first: 3
    ) {
      edges {
        node {
          annictId
          title
          watchersCount
          seasonYear
        }
      }
    }
  }
`

export const resultQuery = ref(null)

export async function fetchItems() {
  
  // const loading = ref(true);
  // const error = ref(null);

  try {
    const httpLink = createHttpLink({
      uri: 'https://api.annict.com/graphql',
      headers: {
        Authorization: 'Bearer D3ElPXO8ld0k4r895fkRS2bLeInD0eXs1KAH9rsw8w4'
      }
    })

    const apolloClient = new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache()
    })

    // Apollo ClientをVueのコンポーネントツリーに提供
    provideApolloClient(apolloClient)

    const { onResult } = useQuery(GET_WORKS, {
      fetchPolicy: 'network-only'
    })

    onResult((result) => {
      // console.log(result.data.searchWorks)
      // console.log(result.data.searchWorks.edges[0].node.title)
      if (result && result.data) {
        resultQuery.value = result.data.searchWorks
        console.log(resultQuery.value)
      }
    })

    // 非同期処理（例: API リクエスト）
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(resultQuery.value)
        resolve(resultQuery.value) // 戻り値としてデータを返す
      }, 1000)
    })
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
