import { defineStore } from 'pinia'

type Anime = {
  title: string;
  watchersCount: number;
  seasonYear: string;
  image: { facebookOgImageUrl: string };
}


export const useAnimeStore = defineStore('anime', {
  state: () => ({
    searchKey: '' as String,
    animeList: [] as Anime[],
    selectedAnime: null as Anime | null, // 選択中のアニメを保持
  }),
  actions: {
    setSearchKey(key: String) {
      this.searchKey = key;
    },
    setAnimeList(anime: Anime[]) {
      this.animeList = anime;
    },
    setSelectedAnime(anime: Anime) {
      this.selectedAnime = anime;
    },
  },
});
