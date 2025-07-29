"use client";
import { createStoreWithDevtools } from "./createStoreWithDevtools";

const useUserStore = createStoreWithDevtools(
  (set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
  }),
  "UserStore"
);

export default useUserStore;
