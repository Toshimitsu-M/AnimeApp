<template>
  <router-link :to="router.link" class="relative max-w-xs rounded-3xl overflow-hidden shadow-xl m-4 transition-transform duration-300 hover:-translate-y-[3px] hover:shadow-2xl" @click="handleClick">
    <span class="absolute top-[1px] left-[1px] bg-orange-700/80 text-white text-lg font-bold px-3 py-1 rounded-full">{{ number+1 }}</span>
    <img :src="image" alt="Card image" class="block" />
    <div class="p-4">
      <p class="text-xs font-semibold mt-4 text-gray-800 dark:text-gray-300 text-center">{{ title }}</p>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useAnimeStore } from '../../store/animeStore';

const store = useAnimeStore();

const router = reactive(
  {
    name: 'アニメ詳細',
    link: '/popularAnime/animeDetail',

  }
);

const props = defineProps<{ 
  title: string;
  image: string;
  number: number;
}>();

const handleClick = () => {
  console.log(props.title)
  store.setSelectedAnime({
    title: props.title,
    watchersCount: 0,  // 値がないので仮のデータ
    seasonYear: "",
    image: { facebookOgImageUrl: props.image },
  });
};
</script>
