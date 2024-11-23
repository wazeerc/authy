import { create } from "zustand";

interface StoreState {
  activeUserName: string;
  setActiveUserName: (name: string) => void;

  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const useStore = create<StoreState>(set => ({
  activeUserName: "",
  setActiveUserName: (name: string) => set({ activeUserName: name }),

  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
}));

export default useStore;
