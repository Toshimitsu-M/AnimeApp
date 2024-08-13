import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core'
import { createHttpLink } from '@apollo/client/link/http'
import { useQuery, provideApolloClient } from '@vue/apollo-composable'

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

const { result, loading, error } = useQuery(GET_WORKS)
export default { result, loading, error }
