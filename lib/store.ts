import { create } from "zustand";

export type CursorVariant = "default" | "view" | "drag" | "link" | "code" | "sound" | "target" | "hidden";

interface AppState {
  // Cursor
  cursorVariant: CursorVariant;
  cursorText: string;
  setCursor: (variant: CursorVariant, text?: string) => void;
  resetCursor: () => void;

  // Loader state
  isLoaded: boolean;
  setIsLoaded: (val: boolean) => void;

  // Audio
  isAudioEnabled: boolean;
  toggleAudio: () => void;

  // Developer terminal / modal
  isDevModalOpen: boolean;
  setDevModalOpen: (val: boolean) => void;

  // Active modal details
  activeModal: string | null;
  setActiveModal: (id: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  cursorVariant: "default",
  cursorText: "",
  setCursor: (variant, text = "") => set({ cursorVariant: variant, cursorText: text }),
  resetCursor: () => set({ cursorVariant: "default", cursorText: "" }),

  isLoaded: false,
  setIsLoaded: (val) => set({ isLoaded: val }),

  isAudioEnabled: false,
  toggleAudio: () =>
    set((state) => {
      const next = !state.isAudioEnabled;
      return { isAudioEnabled: next };
    }),

  isDevModalOpen: false,
  setDevModalOpen: (val) => set({ isDevModalOpen: val }),

  activeModal: null,
  setActiveModal: (id) => set({ activeModal: id }),
}));
