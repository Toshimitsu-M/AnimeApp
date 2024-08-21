<template>
  <div class="card">
    <img :src="image" alt="Card image" class="card-image" />
    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-description">{{ description }}</p>
      <button @click="handleButtonClick" class="card-button">{{ buttonText }}</button>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'AnnictCard'
    // その他のコンポーネントオプション
  }
  </script>

<script setup lang=ts>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  title: String,
  image: String,
  description: String,
  buttonText: {
    type: String,
    default: 'Learn More'
  }
})

const emit = defineEmits(['button-click'])

function handleButtonClick() {
  emit('button-click')
}
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  max-width: 300px;
  margin: 16px;
}
.card-image {
  width: 100%;
  height: auto;
}
.card-content {
  padding: 16px;
}
.card-title {
  font-size: 1.5em;
  margin: 0;
}
.card-description {
  margin: 16px 0;
}
.card-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
}
.card-button:hover {
  background-color: #0056b3;
}
</style>
