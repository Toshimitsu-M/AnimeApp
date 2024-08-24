<script setup>
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

</script>
