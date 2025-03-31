import { defineStore } from 'pinia'

type Character = {
  id: string
  name: string
  image: string
  voiceActors: string
  voiceActorsImage: string
}

export const useCharacterStore = defineStore('character', {
  state: () => ({
    selectedCharacter: null as Character | null
  }),
  actions: {
    setSelectedCharacter(character: Character) {
      this.selectedCharacter = character
    }
  }
})
