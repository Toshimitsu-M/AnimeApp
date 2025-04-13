import { createRouter, createWebHashHistory } from 'vue-router';
import AnimeHome from '../pages/AnimeHome.vue';
import PokepokeCard from '../pages/PokepokeCard.vue';
import MarkItDown from '../pages/MarkItDown.vue';
import CorkBoard from '../pages/CorkBoard.vue';
import AnimeList from '../pages/AnimeList.vue';
import AnimeDetail from '../components/annictapi/AnimeDetail.vue';
import CharacterDetail from '../components/annictapi/CharacterDetail.vue';
import Home from '../pages/Home.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    // 人気アニメ AnimeHome
    path: '/animeHome',
    name: 'AnimeHome',
    component: AnimeHome,
  },
  {
    // ポケポケカード PokepokeCard
    path: '/pokepokeCard',
    name: 'PokepokeCard',
    component: PokepokeCard,
  },
  {
    // MarkItDown MarkItDown 
    path: '/markItDown',
    name: 'MarkItDown',
    component: MarkItDown,
  },
  {
    // コルクボード CorkBoard
    path: '/corkBoard',
    name: 'CorkBoard',
    component: CorkBoard,
  },
  {
    // アニメリスト AnimeList
    path: '/animeList',
    name: 'AnimeList',
    component: AnimeList,
  },
  {
    // アニメ詳細 AnimeDetail
    path: '/popularAnime/animeDetail',
    name: 'AnimeDetail',
    component: AnimeDetail,
  },
  {
    // キャラクター詳細 CharacterDetail
    path: '/popularAnime/characterDetail',
    name: 'CharacterDetail',
    component: CharacterDetail,
  }
];

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;