<script setup></script>
<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-4xl font-bold mb-4">MarkItDown</h1>
    <p class="text-lg mb-8">Markdown形式に簡単に変換することができます。</p>
    <p class="text-lg mb-4">アプリのインストーラーをダウンロードしてください。</p>
  <a :href="fileUrl" download="MyAppInstaller.exe">アプリをダウンロード</a>
</div>
</template>

<script>
export default {
  data() {
    return {
      fileUrl: 'https://your-server.com/downloads/MyAppInstaller.exe'
    }
  }
}
</script>
