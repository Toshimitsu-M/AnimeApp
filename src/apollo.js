import { InMemoryCache, HttpLink, ApolloClient, ApolloLink, split } from '@apollo/client/core';
import { getMainDefinition } from '@apollo/client/utilities';

// Annict API への接続
const annictLink = new HttpLink({
  uri: 'https://api.annict.com/graphql',
  headers: {
    Authorization: 'Bearer D3ElPXO8ld0k4r895fkRS2bLeInD0eXs1KAH9rsw8w4'
  }
});

// AniList API への接続
const anilistLink = new HttpLink({
  uri: 'https://graphql.anilist.co'
});

// API の切り替え
const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'query' &&
      ( query.loc?.source.body.includes('Media') || query.loc?.source.body.includes('Page'))// AniList のクエリ判定
    );
  },
  anilistLink, // AniList API へ送信
  annictLink   // それ以外は Annict API へ送信
);

// ApolloClient インスタンス生成
export const apolloClient = new ApolloClient({
  link,
  // キャッシュを渡す。InMemoryCacheはApolloClientのデフォルトのキャッシュ実装であるのでこれを使用
  cache: new InMemoryCache(),
  // Apollo Client Devtoolsを、Webブラウザのインスペクタに「Apollo」タブとして表示する
  connectToDevTools: true
});

export default apolloClient;
