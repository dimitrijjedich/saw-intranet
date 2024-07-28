import { create } from "zustand";

interface AppState {
    currentModule: AppModuleNames;
    updateCurrentModule: (newModule: AppModuleNames) => void;
}

export type AppModuleNames = "welcome" | "test";

const useAppStoreController = create<AppState>((set) => ({
    currentModule: "welcome",
    updateCurrentModule: (newModule) => set({ currentModule: newModule }),
}));

export { useAppStoreController };
