<template>
    <div>
      <h1>アニメ一覧</h1>
      <ul>
        <li v-for="anime in animeList" :key="anime.title">
          {{ anime.title }} ({{ anime.year }})
        </li>
      </ul>
      <ul>
        <li></li>
      </ul>
    </div>
  </template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

type Anime = { 
    id: number
    title: string 
    year: string 
}
const animeList = ref<Anime[]>([]);

const fetchAnimeList = async () => {
  try {
    // const response = await fetch('http://localhost:8080/api/anime');
    const response = await axios.get<Anime[]>('http://localhost:8080/api/anime');
    animeList.value =  response.data 
  } catch (error) {
    console.error('API Error:', error);
  } 
};


onMounted(fetchAnimeList) // マウント時にデータ取得
</script>


