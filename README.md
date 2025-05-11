# frontend-vue

このリポジトリは、Vue 3 + Vite を使用したフロントエンド開発用のテンプレートです。  
主にアニメ情報管理アプリなどを含む「UI Labo。」のフロントエンドとして使用されています。

## 前提環境（推奨）

- [Visual Studio Code](https://code.visualstudio.com/)
- 拡張機能: [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)  
  ※ Vetur は無効化してください。

## プロジェクトのセットアップ

依存関係をインストールします。

```bash
npm install
````

## 開発サーバーの起動（ホットリロード対応）

```bash
npm run dev
```

## 型チェック & 本番用ビルド（圧縮あり）

```bash
npm run build
```

## Lint チェック（[ESLint](https://eslint.org/) 使用）

```bash
npm run lint
```

## `.vue` ファイルの型サポート（TypeScript）

TypeScript は `.vue` ファイルの型を標準では理解できません。
そのため `tsc` の代わりに `vue-tsc` を使い、Volar 拡張機能を有効にする必要があります。

## その他の設定カスタマイズ

[Vite 設定ガイド（公式）](https://vitejs.dev/config/) を参考にしてください。

---

## 補足

このプロジェクトは、「つくって試して、育てていくラボ的ポートフォリオ」の一環です。
本リポジトリでは、主にフロントエンドの技術スタック（Vue 3, Vite, TypeScript）の検証・適用を行っています。

