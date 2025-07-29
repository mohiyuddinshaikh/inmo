import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const createStoreWithDevtools = (storeFn, name) =>
  create(devtools(storeFn, { name }));
