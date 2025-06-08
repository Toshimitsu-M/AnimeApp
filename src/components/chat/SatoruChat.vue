<template>
  <div class="max-w-xl mx-auto p-4">
    <div class="h-[70vh] overflow-y-auto p-4 space-y-2 bg-white rounded-xl shadow">
      <div v-for="(msg, i) in messages" :key="i" :class="msg.sender === 'You' ? 'text-right' : 'text-left'">
        <p><span class="font-bold">{{ msg.sender }}:</span> {{ msg.text }}</p>
      </div>
    </div>
    <div class="flex items-center mt-4 gap-2">
      <input
        v-model="input"
        @keydown.enter="sendMessage"
        placeholder="サトルに話しかけよう..."
        class="flex-grow border p-2 rounded"
      />
      <button @click="sendMessage" class="px-4 py-2 bg-blue-500 text-white rounded">送信</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const input = ref('');
const messages = ref([
  { sender: 'Satoru', text: 'よぉ、今日も最強なオレが来てやったぞ。何でも聞いていいぜ？' }
]);

const sendMessage = async () => {
  if (!input.value.trim()) return;
  messages.value.push({ sender: 'You', text: input.value });

  const userInput = input.value;
  input.value = '';

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userInput })
    });
    const data = await res.json();
    messages.value.push({ sender: 'Satoru', text: data.reply });
  } catch (err) {
    messages.value.push({ sender: 'Satoru', text: 'うわ、ごめん！ちょっとミスったかも…もう一回お願い！' });
  }
};
</script>

<style scoped>
/* 必要に応じてスタイル追加 */
</style>
