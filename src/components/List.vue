<template>
  <ul class="">
    <li class="mb-1 hover:bg-gray-100/10 dark:hover:bg-orange-100/10" v-for="list in lists" :key="list.name">
      <router-link :to="list.link" class="
                flex
                items-center
                block
                p-2
                rounded-sm">
        <span class="text-orange-600 dark:text-white/50 ">{{ list.name }}</span>
      </router-link>
    </li>
  </ul>
</template>

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
  {
    name: 'AIチャット',
    icon: 'ClipboardDocumentCheckIcon',
    link: '/characterChat',
  },
  // {
  //   name: 'アニメリスト',
  //   icon: 'ClipboardDocumentCheckIcon',
  //   link: '/animeList',
  // }
]);



</script>