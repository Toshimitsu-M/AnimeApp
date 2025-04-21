<script setup lang="ts">
import { reactive } from 'vue';
import {
  ClipboardDocumentCheckIcon,
  ShoppingCartIcon,
  ChevronDownIcon,
} from '@heroicons/vue/24/outline';

// 人気アニメ PopularAnime
// ポケポケカード PokepokeCard
// MarkItDown MarkItDown 
// コルクボード CorkBoard
// アニメリスト AnimeList
const lists = reactive([
  {
    name: 'ホーム',
    icon: 'ClipboardDocumentCheckIcon',
    link: '/',
  },  
  {
    name: 'アニメホーム',
    icon: 'ClipboardDocumentCheckIcon',
    link: '/animeHome',
  },
  {
    name: 'ポケポケカード',
    icon: 'ClipboardDocumentCheckIcon',
    link: '/pokepokeCard',
  },
  {
    name: 'MarkItDown',
    icon: 'ClipboardDocumentCheckIcon',
    link: '/markItDown',
  },
  {
    name: 'コルクボード',
    icon: 'ClipboardDocumentCheckIcon',
    link: '/corkBoard',
  },
  // {
  //   name: 'アニメリスト',
  //   icon: 'ClipboardDocumentCheckIcon',
  //   link: '/animeList',
  // }
]);



</script>
<template>
  <ul class="text-gray-700">
    <li class="mb-1" v-for="list in lists" :key="list.name">
        <router-link
            :to="list.link"
            class="
                flex
                items-center
                block
                p-2
                rounded-sm
                hover:text-white hover:bg-blue-400">
        <span>{{ list.name }}</span>
        </router-link>
    </li>
  </ul>
</template>