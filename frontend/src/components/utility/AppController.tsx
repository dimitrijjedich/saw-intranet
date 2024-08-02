import { create } from "zustand";
import {ModuleNames} from "../modules/ModuleRegistry";

interface AppState {
    currentModule: ModuleNames;
    updateCurrentModule: (newModule: ModuleNames) => void;
    debugMode: boolean;
    setDebugMode: (debugMode: boolean) => void;
}

const useAppStoreController = create<AppState>((set) => ({
    currentModule: "welcome",
    updateCurrentModule: (newModule) => set({ currentModule: newModule }),
    debugMode: false,
    setDebugMode: (debugMode) => set({ debugMode }),
}));

export { useAppStoreController };
