<template>
    <div class="drag-card-container">
      <div class="drag-card" @mousemove="onMouseMove" @mouseleave="onMouseLeave" ref="dragCard">
        <h2>ポケポケカード</h2>
        <p>サブタイトル</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      onMouseMove(event) {
        const card = this.$refs.dragCard;
        const { offsetWidth: width, offsetHeight: height } = card;
        const { offsetX: x, offsetY: y } = event;
        const rotateX = ((y / height) - 0.5) * 90; // 上下の回転
        const rotateY = ((x / width) - 0.5) * -90; // 左右の回転
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      },
      onMouseLeave() {
        const card = this.$refs.dragCard;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      },
    },
  };
  </script>
  
  <style>
  .drag-card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
  }
  
  .drag-card {
    width: 300px;
    height: 400px;
    background: linear-gradient(145deg, #ffffff, #e6e6e6);
    border-radius: 15px;
    box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.2);
    transition: transform 0.1s ease;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .drag-card h2 {
    margin: 0;
    font-size: 1.5em;
    color: rgb(117, 103, 103);
  }
  .drag-card p {
    margin: 0.5em 0 0;
    font-size: 1em;
    color: #666;
  }
  </style>
  