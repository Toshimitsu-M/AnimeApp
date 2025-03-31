<template>
  <div class="p-4">
    <ArrowLeftIcon @click="router.back()" class="w-10 h-10 text-black p-2 mb-4 rounded-lg cursor-pointer"></ArrowLeftIcon>
    <img :src="image?.facebookOgImageUrl || 'no_image.jpg'" alt="Card image" class="w-3/5 mx-auto" />
    <br>
    <div class="text-2xl font-bold">{{ title }}</div>
    <br><br>
    <h1 class="text-ml mb-4">キャラクター</h1>
    <!-- キャラクターの一覧表示 -->
    <div id="app" class="p-6 flex flex-col items-center">
    <div v-if="loading" class="text-center text-gray-500">Loading...</div>
    <div v-else-if="animeDetail?.Media?.characters?.edges.length" 
      class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 justify-items-center w-full max-w-screen-xl mx-auto">
      
      <Card
        v-for="(character, index) in animeDetail?.Media?.characters?.edges"
        :key="index"
        :name="character.node.name.native"
        :image="character.node.image.large || 'no_image_yoko.jpg'"
        :voiceActors="character.voiceActors[0]?.name?.native || '不明'"
        :voiceActorsImage="character.voiceActors[0]?.image?.large || 'no_image_yoko.jpg'"
      />
    </div>
    <div v-else class="text-center text-gray-500">データがありません</div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useAnimeStore } from '../../store/animeStore';
import Card from './CharacterCard.vue'
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'

const router = useRouter();
const store = useAnimeStore();
const title = computed(() => store.selectedAnime?.title);
const image = computed(() => store.selectedAnime?.image);

//型
type Query = {
    Media: AnimeData;
}

type AnimeData = {
  id: number;
  title: {
    romaji: string;
    english?: string;
    native: string;
  };
  characters: {
    edges: AnimeCharacter[];
  };
}

type AnimeCharacter = {
  role: string;
  node: {
    name: {
      full: string;
      native: string;
    };
    image: {
      large: string;
    };
  };
  voiceActors: {
    name: {
      full: string;
      native: string;
    };
    image: {
      large: string;
    };
  }[];
}


// アニメ詳細、キャラクター一覧 クエリの定義
const GET_WORKS = gql `
    query ($title: String) {
      Media(search: $title, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        characters (sort: [ROLE, RELEVANCE], perPage: 100) {
          edges {
            role
            node {
              name {
                full
                native
              }
              image {
                large
              }
            }
            voiceActors (language: JAPANESE) {
              name {
                full
                native
              }
              image {
                large
              }
            }
          }
        }
      }
    }
  `;


// クエリ実行 (最初は title が空のため、skip させる)
const { result: animeDetail, loading, refetch } = useQuery<Query>(GET_WORKS, {
  variables: {
    title: title.value || "",  // 初回で `undefined` にならないように空文字
  },
  fetchPolicy: "cache-first",
});

// `title` が変更されたら再取得
watchEffect(() => {
  if (title.value) {
    console.log("Fetching data for:", title.value);
    refetch({ title: title.value });
    console.log(animeDetail.value);
  }
});

</script>

