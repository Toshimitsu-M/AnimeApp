<template>
    <div
      class="relative overflow-hidden flex items-center justify-center min-h-screen transition-colors duration-[4000ms]"
      :class="bgClass"
    >
      <!-- ランダムにバブルが咲く！ -->
      <div v-for="n in 5" :key="n" class="bubble" :style="randomBubbleStyle(n)" />
  
      <!-- 中央テキスト -->
      <transition name="fade">
        <div class="text-center z-10" v-if="showContent">
          <h1 class="text-6xl font-bold mb-6 text-black drop-shadow-lg">🧪 UI Labo。</h1>
          <p class="text-2xl text-black/90">つくって試して、育てていくラボ的ポートフォリオ</p>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomeView',
    data() {
      return {
        showContent: false,
        bgClass: 'bg-gray', // 背景をグレーに設定
        bubbles: []
      };
    },
    mounted() {
      this.showContent = true;
      this.createRandomBubbles();
      setInterval(this.updateBubbles, 2000); // 定期的にバブルの位置を更新
    },
    methods: {
      createRandomBubbles() {
        const numBubbles = 5; // バブルの数
        for (let i = 0; i < numBubbles; i++) {
          this.bubbles.push(this.randomBubbleStyle(i));
        }
      },
      updateBubbles() {
        // バブルの位置をランダムに更新
        this.bubbles = this.bubbles.map((bubble, index) => this.randomBubbleStyle(index));
      },
      randomBubbleStyle(n) {
        const size = Math.random() * 320 + 160; // バブルの大きさ（160〜480px）
        const left = Math.random() * 100; // ランダム位置（横）
        const top = Math.random() * 100; // ランダム位置（縦）
        const delay = Math.random() * 2; // アニメーションの遅延（ランダム）
        const duration = Math.random() * 7 + 3; // アニメーションの時間（ランダム）
        const blur = 0; // ぼかし効果（ランダム）
        const colors = [
          'rgba(255, 99, 132, 0.8)', // 赤
          'rgba(54, 162, 235, 0.8)', // 青
          'rgba(255, 159, 64, 0.8)', // オレンジ
          'rgba(75, 192, 192, 0.8)', // 緑
          'rgba(153, 102, 255, 0.8)', // 紫
          'rgba(255, 205, 86, 0.8)' // 黄
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)]; // ランダムに色を選択
  
        return {
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          top: `${top}%`,
          backgroundColor: randomColor, // 単色の背景色
          borderRadius: '50%',
          boxShadow: `0 0 12px ${randomColor}`, // 同じ色のシャドウ
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          animationName: `bloom${n}`,
          filter: `blur(${blur}px)` // ぼかし効果
        };
      }
    }
  };
  </script>
  
  <style scoped>
  .bubble {
    position: absolute;
    animation: bloom 10s infinite ease-in-out;
    pointer-events: none;
  }
  
  @keyframes bloom {
    0% {
      transform: scale(0.8) translateY(0);
      opacity: 1;
    }
    25% {
      opacity: 1;
      transform: scale(1.3) translateY(-10%);
    }
    50% {
      transform: scale(2) translateY(-50%);
      opacity: 1;
    }
    75% {
      opacity: 1;
      transform: scale(2.5) translateY(-70%);
    }
    100% {
      transform: scale(3) translateY(-100%);
      opacity: 1;
    }
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1.5s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  