<template>
  <div class="bg-gray-00">
    <div class="flex flex-col items-center p-4">
      <div class="flex w-full max-w-xl rounded-full shadow-md overflow-hidden border border-black">
        <input
          type="text"
          placeholder=""
          class="w-full px-4 py-2 text-black bg-white focus:outline-none placeholder-gray-400"
          v-model="searchItems"
          @keyup.enter="performSearch"
        />
        <button
          class="bg-gray-700 hover:bg-orange-600 px-4 flex items-center justify-center"
          @click="performSearch"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 96 960 960"
            width="24"
            class="fill-white"
          >
            <path
              d="M796 928 548 680q-29 24-63.5 37.5T412 731q-86 0-146.5-60.5T205 524q0-86 60.5-146.5T412 317q86 0 146.5 60.5T619 524q0 34-13.5 68.5T568 656l248 248-20 24ZM412 679q66 0 112.5-46.5T571 520q0-66-46.5-112.5T412 361q-66 0-112.5 46.5T253 520q0 66 46.5 112.5T412 679Z"
            />
          </svg>
        </button>
      </div>
      <!-- コンテンツ -->
      <div class="p-10 w-full mx-auto">
        <!-- タブヘッダー -->
        <div class="flex border-b border-gray-300 justify-center">
          <button
            v-for="(tab, index) in tabs"
            :key="index"
            @click="selectedTab = index"
            :class="[
              'py-2 px-4 text-lg font-bold transition-all',
              selectedTab === index
                ? 'text-orange-600 border-b-4 border-orange-600'
                : 'text-gray-500 hover:text-orange-600'
            ]"
          >
            {{ tab.label }}
          </button>
        </div>
        <!-- タブコンテンツ -->
        <div class="p-6 text-lg">
          <div v-if="selectedTab === 0"><CurrentAnime></CurrentAnime></div>
          <div v-if="selectedTab === 1"><NextAnime></NextAnime></div>
          <div v-if="selectedTab === 2"><SeasonalAnime></SeasonalAnime></div>
          <div v-if="selectedTab === 3"><AnimeList></AnimeList></div>
          <div v-if="selectedTab === 4"><CharactersList></CharactersList></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
import CurrentAnime from '../components/AnnictAPI/CurrentAnime.vue'
import NextAnime from '../components/AnnictAPI/NextAnime.vue'
import SeasonalAnime from '../components/AnnictAPI/SeasonalAnime.vue'
import AnimeList from '../components/AnnictAPI/AnimeList.vue'
import CharactersList from '../components/AnnictAPI/CharactersList.vue'
import { useAnimeStore } from '../store/animeStore' // ストアをインポート

// 検索バーの入力値を保持するためのref
const searchItems = ref<string>('')
const searchKey = ref<string>('')

// クリックおよびenter押下時に key を更新
const performSearch = () => {
  console.log(searchItems.value) // 現在の検索バーの値をコンソールに出力
  searchKey.value = searchItems.value

  // 検索キーをストアに保持
  const store = useAnimeStore()
  store.setSearchKey(searchKey.value)
}

const selectedTab = ref(0)
const tabs = ref([
  { label: '今期のアニメ' },
  { label: '来期のアニメ' },
  { label: 'N期のアニメ' },
  { label: 'アニメ作品' },
  { label: 'キャラクター' }
])
</script>
