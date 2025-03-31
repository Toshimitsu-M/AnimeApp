<template>
  <router-link 
    :to="router.link" 
    class="relative w-full max-w-2xl flex items-center rounded-3xl overflow-hidden border border-gray-300 shadow-lg m-4" 
    @click="handleClick"
  >
    <!-- 画像を左側に配置 -->
    <img :src="image" alt="Card image" class="w-1/3 h-auto object-cover" />
    
    <!-- テキスト部分 -->
    <div class="p-6 flex-1">
      <p class="text-sm font-semibold text-gray-800">{{ name }}</p>
      <p class="text-sm font-semibold text-gray-800">CV: {{ voiceActors }}</p>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useCharacterStore } from '../../store/characterStore';

const store = useCharacterStore();

const router = reactive(
  {
    name: 'キャラクター詳細',
    link: '/popularAnime/characterDetail',

  }
);

const props = defineProps<{ 
  id: string;
  name: string;
  image: string;
  voiceActors: string;
  voiceActorsImage: string;
}>();

//キャラクターカード押下
const handleClick = () => {
  console.log(props.name)
  store.setSelectedCharacter({
    id: props.id,
    name: props.name,
    image: props.image,
    voiceActors: props.voiceActors,
    voiceActorsImage: props.voiceActorsImage,
  });
};
</script>
