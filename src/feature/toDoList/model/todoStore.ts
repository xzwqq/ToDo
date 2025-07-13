import { create } from 'zustand'

type Store = {
  render: boolean
  editVisible: boolean
  setRender: (action: boolean) => void
  setEditVisible: (action: boolean) => void
}

export const useTodoListStore = create<Store>()((set) => ({
  render: false,
  editVisible: false,
  setRender: (action) => set((state) => ({ render: state.render = action })),
  setEditVisible: (action) => set((state) => ({ editVisible: state.editVisible = action })),

}))