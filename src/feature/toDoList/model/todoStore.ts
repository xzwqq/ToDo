import { create } from 'zustand'

type Store = {
  render: boolean
  editVisible: number | null
  setRender: (action: boolean) => void
  setEditVisible: (action: number | null) => void
}

export const useTodoListStore = create<Store>()((set) => ({
  render: false,
  editVisible: null,
  setRender: (action) => set((state) => ({ render: state.render = action })),
  setEditVisible: (action) => set((state) => ({ editVisible: state.editVisible = action })),

}))