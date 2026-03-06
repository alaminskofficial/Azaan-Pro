import { create } from "zustand";

type QuranState = {

  showTranslation: boolean
  activeAyah: number | null
  bookmarks: number[]

  toggleTranslation: () => void
  setActiveAyah: (id:number) => void
  addBookmark: (ayah:number) => void
}

export const useQuranStore = create<QuranState>((set)=>({

  showTranslation:true,
  activeAyah:null,
  bookmarks:[],

  toggleTranslation:()=>set(state=>({
    showTranslation:!state.showTranslation
  })),

  setActiveAyah:(id)=>set({
    activeAyah:id
  }),

  addBookmark:(ayah)=>set(state=>({
    bookmarks:[...state.bookmarks,ayah]
  }))

}))