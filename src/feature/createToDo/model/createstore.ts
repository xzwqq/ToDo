import { create } from "zustand";

type Store = {
  endDate: Date | undefined;
  setEndDate: (action: Date | undefined) => void;
  startDate: Date | undefined;
  setStartDate: (action: Date | undefined) => void;
};

export const useCreateStore = create<Store>()((set) => ({
  startDate: new Date(),
  setStartDate: (action) =>
    set((state) => ({ startDate: (state.startDate = action) })),
  endDate: undefined,
  setEndDate: (action) =>
    set((state) => ({ endDate: (state.endDate = action) })),
}));
