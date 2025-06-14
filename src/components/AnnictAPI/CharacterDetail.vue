<template>
  <div class="relative h-screen top-5">
    <!-- 戻るボタン -->
    <ArrowLeftIcon
      @click="router.back()"
      class="w-10 h-10 text-black p-2 mb-4 rounded-lg cursor-pointer"
    ></ArrowLeftIcon>

    <!-- キャラクター情報 -->
    <div class="flex flex-col items-center mx-auto">
      <!-- キャラクター画像 -->
      <img :src="character?.image" class="w-40 h-40 object-cover rounded-lg shadow-md mb-4" />

      <!-- キャラクター名 -->
      <h2 class="text-lg font-semibold">
        {{ character?.name }}&nbsp;&nbsp;&nbsp;CV: {{ character?.voiceActors }}
      </h2>

      <!-- 声優画像 -->
      <img
        :src="character?.voiceActorsImage"
        class="w-20 h-20 object-cover rounded-full shadow-md mt-2 cursor-pointer"
        @click="searchVoiceActor"
      />

      <!-- お気に入りボタン -->
      <button
        v-if="character"
        @click="toggleFavorite"
        :class="favorites.includes(character.name) ? 'bg-red-500' : 'bg-blue-500'"
        class="p-2 text-white rounded-lg mt-4 w-40 shadow-md"
      >
        {{ favorites.includes(character.name) ? 'お気に入り解除' : 'お気に入り追加' }}
      </button>
    </div>

    <!-- コメント欄 -->
    <div class="mt-4 w-full mx-auto flex flex-col items-center">
      <ul class="mt-2 w-1/2">
        <li
          v-for="(c, index) in characterCommentList"
          :key="index"
          class="p-3 flex items-center gap-2"
        >
          <UserCircleIcon class="w-6 h-6"></UserCircleIcon>
          <span v-if="editingIndex !== c.id">{{ c.commentText }}</span>
          <textarea
            v-else
            v-model="editComment"
            class="outline-none resize-none p-1 rounded-lg w-full"
            @compositionstart="addIsComposing = true"
            @compositionend="addIsComposing = false"
            @keydown.enter.exact.prevent="editHandleEnter(c.id)"
            @keydown.shift.enter.prevent="addNewline"
          ></textarea>
          <div class="relative inline-block ml-auto">
            <!-- 3点リーダーアイコン -->
            <EllipsisVerticalIcon
              class="h-6 w-6 text-gray-600 cursor-pointer"
              @click.stop="toggleMenu(c.id)"
            />

            <!-- ポップアップメニュー -->
            <div
              v-if="showMenu === c.id"
              class="menu-container absolute right-0 top-full mt-1 bg-white shadow-lg rounded-md w-32 z-20 border"
            >
              <button
                v-if="editingIndex !== c.id"
                @click="editCommentStart(c.id, c.commentText)"
                class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                編集
              </button>
              <button
                v-else
                @click="editCommentSave(c.id)"
                class="block w-full px-4 py-2 text-sm text-green-700 hover:bg-gray-100"
              >
                保存
              </button>
              <button
                v-if="editingIndex === c.id"
                @click="editingIndex = null"
                class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                キャンセル
              </button>
              <button
                @click="deleteComment(c.id)"
                class="block w-full px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
              >
                削除
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- コメント入力エリア -->
    <div
      class="sticky bottom-8 sm:w-2/3 md:w-1/2 max-w-4xl border bg-gray-100 rounded-3xl sm:-translate-x-[-33%] md:-translate-x-[-50%] p-4 flex justify-center items-center gap-2 mt-100"
    >
      <textarea
        v-model="comment"
        placeholder="コメントする..."
        class="outline-none resize-none flex-grow w-full md:w-4/5"
        @compositionstart="addIsComposing = true"
        @compositionend="addIsComposing = false"
        @keydown.enter.exact.prevent="addHandleEnter"
        @keydown.shift.enter.prevent="addNewline"
      ></textarea>
      <ArrowUpIcon
        @click="addComment"
        class="w-10 h-10 bg-blue-500 text-white p-3 rounded-full"
      ></ArrowUpIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCharacterStore } from '../../store/characterStore'
import { storeToRefs } from 'pinia'
import {
  EllipsisVerticalIcon,
  UserCircleIcon,
  ArrowLeftIcon,
  ArrowUpIcon
} from '@heroicons/vue/24/outline'
import axios from 'axios'

type Comment = {
  id: number
  text: string
}

const route = useRoute()
const router = useRouter()
const comments = ref<Comment[]>([])
const comment = ref('')
const favorites = ref<string[]>([])
const addIsComposing = ref(true)
const editIsComposing = ref(false)
const baseUrl = import.meta.env.VITE_API_BASE_URL;

// キャラクター詳細情報の取得
const store = useCharacterStore()
const { selectedCharacter } = storeToRefs(store)
const character = selectedCharacter
console.log(character.value)

//お気に入り処理
const toggleFavorite = () => {
  console.log('toggleFavorite called') // これで関数が呼ばれているか確認
  console.log(character.value?.name) // 正しくIDが取得されているか確認
  const id = character.value?.name as string
  if (favorites.value.includes(id)) {
    favorites.value = favorites.value.filter((fav) => fav !== id)
  } else {
    favorites.value = [...favorites.value, id]
  }
}

//コメント追加
const addHandleEnter = () => {
  if (!addIsComposing.value) {
    addComment()
  }
}

const addComment = async () => {
  if (comment.value.trim()) {
    try {
      //コメントシーケンス取得
      // await fetchCommentSequence()

      // sequence.value が正しく取得されているか確認
      // if (!sequence.value) {
      //   throw new Error('シーケンスの取得に失敗しました')
      // }
      await fetchCommentSave(sequence.value as number, comment.value) //コメント編集保存API

      // コメントリストに新しいコメントを追加
      characterCommentList.value.push({
        id: sequence.value as number, // シーケンスID
        anilistId: character.value?.id
          ? (character.value.id as string)
          : (character.value?.name as string), // Anilist ID
        userId: 'hoge', // ユーザーID
        commentText: comment.value // コメント内容
      })

      // コメントリストの内容をログに表示
      console.log(characterCommentList.value)

      comment.value = ''
    } catch (error) {
      console.error('コメント追加に失敗しました:', error)
      // 必要ならユーザーにエラーメッセージを表示
    }
  }
}

//コメント編集
const editingIndex = ref<number | null>(null)
const editComment = ref<string>('')
const editCommentStart = (id: number, text: string) => {
  console.log('コメント編集中 id:' + id + ', text:' + text)
  editingIndex.value = id
  editComment.value = text
}

//コメント編集の保存
const editHandleEnter = (id:number) => {
  if (!editIsComposing.value) {
    editCommentSave(id)
  }
}

const editCommentSave = async (id: number) => {
  if (editComment.value.trim()) {
    try {
      await fetchCommentSave(id, editComment.value) //コメント編集保存API
      console.log('コメント保存しました id:' + id)
    } catch (error) {
      console.error('コメント削除に失敗しました', error)
    }

    // コメントリストの中から該当するコメントを検索して更新
    const comment = comments.value.find((c) => c.id === id)
    if (comment) {
      comment.text = editComment.value // これで comments 配列内の該当コメントのテキストが更新される
    }

    editingIndex.value = null
  }
}

//コメント削除
const deleteComment = async (id: number) => {
  try {
    await fetchCommentDelete(id) //コメント削除API
  } catch (error) {
    console.error('コメント削除に失敗しました', error)
  }
}

// コメントの変更を監視してローカルストレージに保存
// const COMMENT_STORAGE_KEY = "cachedComment";
// watch(comment, (newValue) => {
//   localStorage.setItem(COMMENT_STORAGE_KEY, newValue);
// });

// Shift + Enter で改行
const addNewline = (event: Event) => {
  if (event.target) {
    // @ts-ignore
    event.target.value += '\n' 
  }
}

const showMenu = ref<number | null>(null)

const toggleMenu = (index: number) => {
  showMenu.value = showMenu.value === index ? null : index
}

// メニューをクリック以外で閉じる
const closeMenu = (event: Event) => {
  // @ts-ignore
  if (!event.target.closest('.menu-container')) {
    showMenu.value = null
  }
}

onMounted(() => {
  // @ts-ignore
  document.addEventListener('click', closeMenu)
})

onBeforeUnmount(() => {
  // @ts-ignore
  document.removeEventListener('click', closeMenu)
})

type characterComment = {
  id: number
  anilistId: string
  userId: string
  commentText: string
}
const characterCommentList = ref<characterComment[]>([])

//コメントリストAPI取得
const fetchCommentList = () => {
  try {
    let id: string
    if (character.value?.id) {
      id = character.value.id
    } else {
      id = character.value?.name as string
    }
    axios
      .get<characterComment[]>(`${baseUrl}/characterComment/all/${id}`)
      .then((response) => {
        console.log('レスポンスコメントリスト：', response.data)
        characterCommentList.value = response.data
        // await nextTick();
        console.log('コメントリスト：', characterCommentList.value)
      })
  } catch (error) {
    console.error('API Error:', error)
  }
}

//コメントシーケンスAPI取得
const sequence = ref<number | null>(null)
const fetchCommentSequence = () => {
  axios
    .get<number>(`${baseUrl}/characterComment/next-sequence`)
    .then((response) => {
      // レスポンスが成功した場合にシーケンスの値を設定
      sequence.value = response.data

      // シーケンスの値をログ出力
      console.log('シーケンス:', sequence.value)
    })
    .catch((error) => {
      // エラーハンドリング
      console.error('API Error:', error)
    })
}

//コメントの追加、更新API
const saveResult = ref<string>()
const fetchCommentSave = (id: number, text: string) => {
  const commentData: characterComment = {
    id: id,
    anilistId: character.value?.id
      ? (character.value.id as string)
      : (character.value?.name as string),
    userId: 'hoge',
    commentText: text
  }
  try {
    axios
      .post<string>(`${baseUrl}/characterComment/process`, commentData)
      .then((response) => {
        console.log(response.data)
        saveResult.value = response.data
      })
  } catch (error) {
    console.error('API Error:', error)
  }
}

//コメント削除
const deleteResult = ref<string>()
const fetchCommentDelete = (id: number) => {
  try {
    axios.delete<string>(`${baseUrl}/characterComment/delete/${id}`).then((response) => {
      deleteResult.value = response.data
    })
  } catch (error) {
    console.error('API Error:', error)
  }
}

// onMounted(fetchCommentList()) // マウント時にデータ取得
onMounted(async () => {
  await fetchCommentList() // fetchCommentListの非同期処理が完了するまで待機
})

// Wikipedia検索
const keyword = ref('');

const searchVoiceActor = () => {

  const name = character.value?.voiceActors ?? '';

  const encoded = encodeURIComponent(name);
  const url = `https://ja.wikipedia.org/wiki/${encoded}`;
  // window.open(url, '_blank');
};
</script>
