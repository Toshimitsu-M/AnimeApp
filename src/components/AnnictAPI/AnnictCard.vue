<template>
  <div class="card">
    <img :src="image" alt="Card image" class="card-image" />
    <div class="card-content">
      <p class="card-title">{{ title }}</p>
      <!-- <p class="card-description">{{ description }}</p> -->
      <button @click="handleButtonClick" class="card-button">{{ buttonText }}</button>
    </div>
  </div>
</template>

<script setup lang=ts>
const props = defineProps({
  title: String,
  image: String,
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
  border-radius: 40px;
  overflow: hidden;
  max-width: 300px;
  margin: 16px;
}
.card-image {
  width: 100%;
  height: auto;
}
.card-content {
  padding: 7px;
}
.card-title {
  font-size: 0.6em;
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
  cursor: pointer;
  font-size:8px;
  padding:6px;
}
.card-button:hover {
  background-color: #0056b3;
}
</style>

