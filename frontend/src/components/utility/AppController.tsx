import { create } from "zustand";

interface AppState {
    currentModule: AppModuleNames;
    updateCurrentModule: (newModule: AppModuleNames) => void;
    debugMode: boolean;
    setDebugMode: (debugMode: boolean) => void;
}

export type AppModuleNames = "welcome" | "test";

const useAppStoreController = create<AppState>((set) => ({
    currentModule: "welcome",
    updateCurrentModule: (newModule) => set({ currentModule: newModule }),
    debugMode: false,
    setDebugMode: (debugMode) => set({ debugMode }),
}));

export { useAppStoreController };
