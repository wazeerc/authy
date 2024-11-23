import { create } from "zustand";

interface StoreState {
  activeUserName: string;
  setActiveUserName: (name: string) => void;
}

const useStore = create<StoreState>(set => ({
  activeUserName: "",
  setActiveUserName: (name: string) => set({ activeUserName: name }),
}));

export default useStore;
