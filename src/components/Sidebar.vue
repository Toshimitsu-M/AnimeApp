<template>
  <div class="p-4">
    <div class="flex items-center justify-between font-bold text-lg text-blue-600">
      <div>UI Labo。</div>
      <div>
        <Bars3Icon
          class="h-6 w-6 text-gray-600 cursor-pointer"
          @click="emit('update:show', !show)"
        />
      </div>  
    </div>
    <div class="mt-8">
      <List />
    </div>
  </div>
</template>


<script setup lang="ts">
import List from './List.vue';
import { ref, watch } from 'vue';
import { Bars3Icon } from '@heroicons/vue/24/outline';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  show: Boolean
});

const emit = defineEmits(['update:show']);
</script>
