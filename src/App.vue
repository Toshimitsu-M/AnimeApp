<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import CharactersList from './components/annictapi/CharactersList.vue'
import AnnictCardImpl from './components/annictapi/AnnictCardImpl.vue'
import DragCard from './components/DragCard.vue'
import { ref } from 'vue'

// 検索バーの入力値を保持するためのref
const searchItems = ref<string>()
const componentKey = ref(0) // コンポーネントの key を管理

// クリック時に key を更新
const performSearch = () => {
  console.log(searchItems.value) // 現在の検索バーの値をコンソールに出力
  componentKey.value += 1; // key を変更して子コンポーネントを再レンダリング
}
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    <div class="wrapper">
      <HelloWorld msg="You did it!!!!!!!" />
    </div>
  </header> -->

  <div class="search-question">あの頃放送していた人気アニメは何だったろう。</div>
  <div class="search-container">
    <input type="text" placeholder="例 : 3年前の夏" class="search-bar" v-model="searchItems" @keyup.enter="performSearch"/>
    <button class="search-button" @click="performSearch">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24">
        <path
          d="M796 928 548 680q-29 24-63.5 37.5T412 731q-86 0-146.5-60.5T205 524q0-86 60.5-146.5T412 317q86 0 146.5 60.5T619 524q0 34-13.5 68.5T568 656l248 248-20 24ZM412 679q66 0 112.5-46.5T571 520q0-66-46.5-112.5T412 361q-66 0-112.5 46.5T253 520q0 66 46.5 112.5T412 679Z"
        />
      </svg>
    </button>
  </div>
  <AnnictCardImpl :key="componentKey" :searchKey="searchItems" />
  <!-- <CharactersList /> -->
  <!-- <TheWelcome /> -->
  <br>
  <br>
  <br>
  <br><br><br><br><br><br><br><br>
  <DragCard />
</template>

<style scoped>
header {
  line-height: 1.5;
}

/* main {
  display: grid;
  grid-template-columns: 1fr;
  padding: 0 2rem;
  margin: 0 auto;
  width: 90%;
  max-width: 1200px;
  height: auto;
} */

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

.search-question {
  display: flex;
  justify-content: center;
}

/* 検索バー */
.search-container {
  display: flex;
  width: 100%;
  max-width: 600px;
  background-color: #121212;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
}

.search-bar {
  width: 100%;
  padding: 10px 16px;
  font-size: 16px;
  border: none;
  background-color: #121212;
  color: #5f5d5d;
}

.search-bar::placeholder {
  color: #5f5d5d;
}

.search-button {
  background-color: #303030;
  border: none;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.search-button svg {
  fill: #fff;
}

.search-button:hover {
  background-color: #295723;
}

.search-bar:focus {
  outline: none;
}

@media (max-width: 600px) {
  .search-container {
    max-width: 100%;
    padding: 0 10px;
  }

  .search-bar {
    font-size: 14px;
  }

  .search-button svg {
    width: 20px;
    height: 20px;
  }
}
</style>
