import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { HttpLink } from 'apollo-link-http';
import VueApollo from 'vue-apollo';


// GraphQL APIへの接続を確立
const httpLink = new HttpLink({
  uri: 'https://api.annict.com/graphql',
  headers: {
    Authorization: 'Bearer D3ElPXO8ld0k4r895fkRS2bLeInD0eXs1KAH9rsw8w4'
  }
});

// ApolloClientインスタンス生成
export const apolloClient = new ApolloClient({
  // データが正しいAPIからポーリングされるように設定
  link: httpLink,
  // キャッシュを渡す。InMemoryCacheはApolloClientのデフォルトのキャッシュ実装であるのでこれを使用
  cache: new InMemoryCache(),
  // Apollo Client Devtoolsを、Webブラウザのインスペクタに「Apollo」タブとして表示する
  connectToDevTools: true
});

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});
