<template>
  <div class="relative h-screen top-5 ">
    <!-- 戻るボタン -->
    <ArrowLeftIcon @click="router.back()"
      class="w-10 h-10 p-2 mb-4 rounded-lg cursor-pointer text-black dark:text-white "></ArrowLeftIcon>

    <!-- キャラクター情報（キャラの名前と画像と、声優の名前と画像） -->
    <div class="flex flex-col items-center mx-auto text-black dark:text-white ">
      <img :src="character?.image" class="w-40 h-40 object-cover rounded-lg shadow-md mb-4" />
      <h2 class="text-lg font-semibold">
        {{ character?.name }}&nbsp;&nbsp;&nbsp;CV: {{ character?.voiceActors }}
      </h2>
      <img :src="character?.voiceActorsImage" class="w-20 h-20 object-cover rounded-full shadow-md mt-2 cursor-pointer"
        @click="searchVoiceActor" />

      <!-- お気に入りボタン -->
      <button v-if="character" @click="toggleFavorite"
        :class="favorites.includes(character.name) ? 'bg-red-500' : 'bg-blue-500'"
        class="p-2 text-white rounded-lg mt-4 w-40 shadow-md">
        {{ favorites.includes(character.name) ? 'お気に入り解除' : 'お気に入り追加' }}
      </button>
    </div>

    <!-- コメント欄 -->
    <div class="mt-4 w-full mx-auto flex flex-col items-center">
      <ul class="mt-2 w-1/2">
        <li v-for="(c, index) in characterCommentList" :key="index" class="p-3 flex items-center gap-2">
          <UserCircleIcon class="w-6 h-6"></UserCircleIcon>
          <span v-if="editingIndex !== c.commentId">{{ c.commentText }}</span>
          <textarea v-else v-model="editComment" class="outline-none resize-none p-1 rounded-lg w-full"
            @compositionstart="addIsComposing = true" @compositionend="addIsComposing = false"
            @keydown.enter.exact.prevent="editHandleEnter(c.commentId)"
            @keydown.shift.enter.prevent="addNewline"></textarea>
          <div class="relative inline-block ml-auto">
            <!-- 3点リーダーアイコン -->
            <EllipsisVerticalIcon class="h-6 w-6 text-gray-600 cursor-pointer" @click.stop="toggleMenu(c.commentId)" />

            <!-- ポップアップメニュー -->
            <div v-if="showMenu === c.commentId"
              class="menu-container absolute right-0 top-full mt-1 bg-white shadow-lg rounded-md w-32 z-20 border">
              <button v-if="editingIndex !== c.commentId" @click="editCommentStart(c.commentId, c.commentText)"
                class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                編集
              </button>
              <button v-else @click="editHandleEnter(c.commentId)"
                class="block w-full px-4 py-2 text-sm text-green-700 hover:bg-gray-100">
                保存
              </button>
              <button v-if="editingIndex === c.commentId" @click="editingIndex = null"
                class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                キャンセル
              </button>
              <button @click="deleteComment(c.commentId)"
                class="block w-full px-4 py-2 text-sm text-red-700 hover:bg-gray-100">
                削除
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- コメント入力エリア -->
    <div
      class="sticky bottom-8 sm:w-2/3 md:w-1/2 max-w-4xl border bg-gray-100 rounded-3xl sm:-translate-x-[-33%] md:-translate-x-[-50%] p-4 flex justify-center items-center gap-2 mt-100">
      <textarea v-model="comment" placeholder="コメントする..." class="outline-none resize-none flex-grow w-full md:w-4/5"
        @compositionstart="addIsComposing = true" @compositionend="addIsComposing = false"
        @keydown.enter.exact.prevent="addHandleEnter" @keydown.shift.enter.prevent="addNewline"></textarea>
      <ArrowUpIcon @click="addHandleEnter" class="w-10 h-10 bg-blue-500 text-white p-3 rounded-full"></ArrowUpIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useCharacterStore } from '../../store/characterStore'
import { storeToRefs } from 'pinia'
import {
  EllipsisVerticalIcon,
  UserCircleIcon,
  ArrowLeftIcon,
  ArrowUpIcon
} from '@heroicons/vue/24/outline'
import { fetchCharacterComments, saveCharacterComment, deleteCharacterComment, type CharacterComment, createCharacterComment } from '../../api/characterComment'
import { useAuthStore } from '../../store/auth'

const auth = useAuthStore()
const router = useRouter()
const comment = ref('')
const favorites = ref<string[]>([])
const addIsComposing = ref(false)
const characterCommentList = ref<CharacterComment[]>([])

// キャラクター詳細情報の取得
const store = useCharacterStore()
const { selectedCharacter } = storeToRefs(store)
const character = selectedCharacter
console.log(character.value)

//お気に入り処理
const toggleFavorite = () => {
  console.log('toggleFavorite called')
  console.log(character.value?.name) // 正しくIDが取得されているか確認
  const id = character.value?.name as string
  if (favorites.value.includes(id)) {
    favorites.value = favorites.value.filter((fav) => fav !== id)
  } else {
    favorites.value = [...favorites.value, id]
  }
}

// characterIdを取得
const getCharacterId = () => {
  if (character.value?.id) {
    return character.value.id
  } else if (character.value?.name) {
    return character.value.name
  } else {
    return ''
  }
}

//コメント追加ハンドラー
const addHandleEnter = async () => {
  if (addIsComposing.value) return // 入力中は処理を中断
  submitComment(0) // IDは0で新規追加を示す
}

//コメント保存のハンドラー
const editHandleEnter = (id: number) => {
  if (addIsComposing.value) return // 入力中は処理を中断
  submitComment(id)
}





// コメント送信（追加・保存）
const submitComment = async (commentId: number) => {
  let commentData: CharacterComment
  //commentIdが0の場合は新規追加、それ以外は編集保存。
  if (commentId === 0) {
    // ログインユーザかゲストユーザかを判定
    if (auth.isLoggedIn()) {
      // ログインユーザで新規追加（API登録）
      commentData = createCharacterComment(commentId, getCharacterId(), auth.user?.email ?? '', comment.value)
      try {
        await saveCharacterComment(commentData) 
      } catch (error) {
        console.error('コメント追加に失敗しました:', error)
      }
      characterCommentList.value.push(commentData)
    } else {
      // ゲストユーザの新規追加（セッションストレージにデータを保存）
      commentData = createCharacterComment(Date.now(), getCharacterId(), "guestUser", comment.value)
      characterCommentList.value.push(commentData)
      sessionStorage.setItem('characterCommentList', JSON.stringify(characterCommentList));
    }

     // コメントリストに新しいコメントを追加
    console.log(characterCommentList.value)
    comment.value = ''

  } else {
    // 編集保存の場合の設定
    // ログインユーザかゲストユーザかを判定
    if (auth.isLoggedIn()) {
      // ログインユーザで編集保存（API登録）
      commentData = createCharacterComment(commentId, getCharacterId(), auth.user?.email ?? '', editComment.value)
      try {
        await saveCharacterComment(commentData)
        console.log('コメント保存しました id:' + commentId)
      } catch (error) {
        console.error('コメント保存に失敗しました:', error)
      }
      
    } else {
      // ゲストユーザの場合の設定
      // セッションストレージからゲストユーザIDを取得
      const guestUserId = sessionStorage.getItem("guestUserId");
      
    }
    // コメントリストの中から該当するコメントを検索して更新
    const comment = characterCommentList.value.find((c) => c.commentId === commentData.commentId)
    if (comment) {
      comment.commentText = editComment.value
    }
    editingIndex.value = null



  }
}

//コメント編集中
const editingIndex = ref<number | null>(null)
const editComment = ref<string>('')
const editCommentStart = (id: number, text: string) => {
  console.log('コメント編集中 id:' + id + ', text:' + text)
  editingIndex.value = id
  editComment.value = text
}



// コメント編集保存（いらないかも
const editCommentSave = async (id: number) => {
  const commentData: CharacterComment = {
    commentId: 1,
    characterId: "d",
    userId: 'hoge',
    commentText: "text"
  }
  if (editComment.value.trim()) {
    try {
      await saveCharacterComment(commentData)
      console.log('コメント保存しました id:' + id)
    } catch (error) {
      console.error('コメント削除に失敗しました', error)
    }

    // コメントリストの中から該当するコメントを検索して更新
    const comment = characterCommentList.value.find((c) => c.commentId === commentData.commentId)
    if (comment) {
      comment.commentText = editComment.value
    }
    editingIndex.value = null
  }
}

//コメント削除
const deleteComment = async (id: number) => {
  // ゲストユーザの場合はセッションストレージから削除
  if (!auth.isLoggedIn()) {
    characterCommentList.value = characterCommentList.value.filter(c => c.commentId !== id)
    sessionStorage.setItem('characterCommentList', JSON.stringify(characterCommentList.value))
    return
  }
  // ログインユーザの場合はAPIを呼び出して削除
  try {
    await deleteCharacterComment(id) //コメント削除API
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

// メニューのトグル
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
  document.addEventListener('click', closeMenu)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeMenu)
})


// マウント時にデータ取得
onMounted(async () => {
  const id = character.value?.id?.toString() || (character.value?.name as string)
  const comments = await fetchCharacterComments(id) // fetchCommentListの非同期処理が完了するまで待機



  if (Array.isArray(comments)) {
    characterCommentList.value = comments
    console.log('コメントリスト：', characterCommentList.value)
  }
})

// Wikipedia検索
const keyword = ref('');
const searchVoiceActor = () => {
  const name = character.value?.voiceActors ?? '';
  const encoded = encodeURIComponent(name);
  const url = `https://ja.wikipedia.org/wiki/${encoded}`;
  // @ts-ignore
  declare const window: any;
  window.open(url, '_blank');
};

</script>
