<template>
    <div>
      <h1>AWS クイズ</h1>
  
      <!-- 問題の表示 -->
      <div v-if="currentQuestion < questions.length">
        <h2>{{ questions[currentQuestion].question }}</h2>
  
        <!-- 選択肢 -->
        <div v-for="(choice, index) in questions[currentQuestion].choices" :key="index">
          <button @click="checkAnswer(index)">{{ choice }}</button>
        </div>
      </div>
  
      <!-- 結果 -->
      <div v-else>
        <h2>結果</h2>
        <p>あなたの正答率は: {{ correctAnswers }} / {{ questions.length }}</p>
        <p v-if="correctAnswers === questions.length">素晴らしい！</p>
        <p v-else>次回頑張りましょう！</p>
      </div>
  
      <!-- 解説の表示 -->
      <div v-if="showExplanation">
        <h3>解説</h3>
        <p>{{ questions[currentQuestion].explanation }}</p>
        <a :href="questions[currentQuestion].referenceUrl" target="_blank">AWS公式ドキュメントを見る</a>
        <button @click="nextQuestion">次の問題</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        questions: [
          {
            id: "q001",
            question: "IAMロールを使うべきケースはどれか？",
            choices: [
              "特定のEC2インスタンスに権限を付与する",
              "特定のIAMユーザーに直接権限を付与する",
              "特定のS3バケットにアクセス権限を設定する",
              "IAMポリシーを削除する"
            ],
            correctAnswer: 0,
            explanation: "IAMロールはEC2などのAWSリソースに一時的な権限を付与するために使われます。",
            referenceUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html"
          },
          {
            id: "q002",
            question: "S3バケットの公開アクセスを制限するには、どの設定を行うべきか？",
            choices: [
              "バケットポリシーを設定する",
              "IAMロールを設定する",
              "CORS設定を変更する",
              "S3のライフサイクルポリシーを設定する"
            ],
            correctAnswer: 0,
            explanation: "S3バケットポリシーでアクセス制限を設定することで、公開アクセスを制御できます。",
            referenceUrl: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html"
          }
        ],
        currentQuestion: 0,
        correctAnswers: 0,
        showExplanation: false
      };
    },
    methods: {
      checkAnswer(index) {
        // 正解判定
        const correct = index === this.questions[this.currentQuestion].correctAnswer;
        if (correct) {
          this.correctAnswers++;
        }
  
        // 解説表示
        this.showExplanation = true;
      },
      nextQuestion() {
        // 次の問題へ進む
        this.currentQuestion++;
        this.showExplanation = false;
      }
    }
  };
  </script>
  
  <style scoped>
  /* 基本的なスタイル */
  h1 {
    text-align: center;
  }
  
  button {
    display: block;
    margin: 10px 0;
  }
  
  h2 {
    font-size: 1.5em;
  }
  </style>
  