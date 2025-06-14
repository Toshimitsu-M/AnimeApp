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
import axios from 'axios'; 

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const input = ref('');
const messages = ref([
  { sender: 'Satoru', text: 'いいよ〜。なんでも聞いて♪ ' }
]);

const sendMessage =  async () => {
  if (!input.value.trim()) return;
  messages.value.push({ sender: 'You', text: input.value });

  const userInput = input.value;
  input.value = '';

  try {
    console.log('送信するよ ' + userInput + ' ' + baseUrl);
    console.log(`${baseUrl}/chat`); // URLの文字列に ; が入ってないか確認
    // axios
    //   .post<string>(`${baseUrl}/chat`, { message: userInput })
    //   .then((response) => {
    //     console.log(response.data)
    //     messages.value.push({ sender: 'Satoru', text: response.data });
    //   })

    const response = await axios.post(`${baseUrl}/chat/chat`, { message: userInput });

    console.log('返ってきたよ', response.data);
    messages.value.push({ sender: 'Satoru', text: response.data });
  } catch (err) {
    console.error('通信エラー:', err);
    messages.value.push({ sender: 'Satoru', text: 'うわ、ごめん！ちょっとミスったかも…もう一回お願い！' });
  }
};
</script>

<style scoped>
/* 必要に応じてスタイル追加 */
</style>

