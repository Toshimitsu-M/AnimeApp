<template>
    <div id="app">
      <h1>Card List</h1>
      <div class="card-container">
        <Card
          v-for="(card, index) in cards"
          :key="index"
          :title="card.title"
          :image="card.image"
          :description="card.description"
          :button-text="card.buttonText"
          @button-click="handleButtonClick(card.title)"
        />
      </div>
    </div>
  </template>
  <script lang="ts">
  export default {
    name: 'AnnictCardImpl'
    // その他のコンポーネントオプション
  }
  </script>

  
  <script setup lang=ts>
  import { ref } from 'vue';
  import Card from './AnnictCard.vue';
  
  // カードデータを定義
  const cards = ref([
    {
      title: 'Card 1',
      image: 'https://via.placeholder.com/300',
      description: 'This is the description for card 1.',
      buttonText: 'Read More'
    },
    {
      title: 'Card 2',
      image: 'https://via.placeholder.com/300',
      description: 'This is the description for card 2.',
      buttonText: 'Learn More'
    },
      {
      title: 'Card 2',
      image: 'https://via.placeholder.com/300',
      description: 'This is the description for card 2.',
      buttonText: 'Learn More'
    },
      {
      title: 'Card 2',
      image: 'https://via.placeholder.com/300',
      description: 'This is the description for card 2.',
      buttonText: 'Learn More'
    }
  
  ]);
  
  // ボタンクリック時の処理
  function handleButtonClick(cardTitle:string) {
    console.log(`Button clicked on ${cardTitle}`);
  }
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  </style>
  