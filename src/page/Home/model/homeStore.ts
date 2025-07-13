import { create } from 'zustand'

type Store = {
  viewcreatetodo: boolean
  status: 'all' | 'todo' | 'in progress' | 'done';
  setViewCreateTodo: () => void
  setStatus: (action: 'all' | 'todo' | 'in progress' | 'done') => void
}

export const useHomeStore = create<Store>()((set) => ({
  viewcreatetodo: false,
  status: 'all',
  setViewCreateTodo: () => set((state) => ({ viewcreatetodo: state.viewcreatetodo = !state.viewcreatetodo })),
  setStatus: (action) => set((state) => ({ status: state.status = action })),
}))