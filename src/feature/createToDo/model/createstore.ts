import { create } from "zustand";

type Store = {
  nowdate: Date | undefined;
  setnowdate: (action: Date | undefined) => void;
};

export const useCreateStore = create<Store>()((set) => ({
  nowdate: undefined,
  setnowdate: (action) =>
    set((state) => ({ nowdate: (state.nowdate = action) })),
}));
