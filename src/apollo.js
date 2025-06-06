import { ApolloClient, InMemoryCache, split } from '@apollo/client/core'
import { createHttpLink } from '@apollo/client/link/http'
import { DefaultApolloClient } from '@vue/apollo-composable'

// Anilist 用リンク
const anilistLink = createHttpLink({
  uri: 'https://graphql.anilist.co'
})

// Annict 用リンク
const annictLink = createHttpLink({
  uri: 'https://api.annict.com/graphql',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_ANNICT_TOKEN}`
  }
})

// split によってクエリ内容でルーティングする
const dynamicLink = split(
  ({ query }) => {
    const queryString = query?.loc?.source?.body ?? ''
    return queryString.includes('Media') || queryString.includes('Page') // Anilist用のクエリ
  },
  anilistLink, // true: Anilist
  annictLink   // false: Annict
)

const apolloClient = new ApolloClient({
  link: dynamicLink,
  cache: new InMemoryCache()
})

export { apolloClient, DefaultApolloClient }

export default apolloClient;
