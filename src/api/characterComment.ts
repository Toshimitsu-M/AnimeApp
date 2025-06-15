
import axios from 'axios'
import { ref } from 'vue'

const baseUrl = (import.meta as any).env.VITE_API_BASE_URL;

// 型定義
export type CharacterComment = {
  commentId: number
  characterId: string
  userId: string
  commentText: string
}

// ファクトリ関数
export function createCharacterComment(
  commentId: number,
  characterId: string,
  userId: string,
  commentText: string
): CharacterComment {
  return {
    commentId,
    characterId,
    userId,
    commentText
  }
}


//コメントリストAPI取得
export const fetchCharacterComments = async (characterId: string): Promise<CharacterComment[]> => {
    try { 
    const response = await axios.get<CharacterComment[]>(`${baseUrl}/characterComment/all/${characterId}`)
    return response.data
  } catch (error) {
    console.error('API Error:', error)
    return []
  }
}


//コメントの追加、更新API
const saveResult = ref<string>()
export const saveCharacterComment = (commentData: CharacterComment) => {
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
export const deleteCharacterComment = (id: number) => {
  try {
    axios.delete<string>(`${baseUrl}/characterComment/delete/${id}`).then((response) => {
      deleteResult.value = response.data
    })
  } catch (error) {
    console.error('API Error:', error)
  }
}