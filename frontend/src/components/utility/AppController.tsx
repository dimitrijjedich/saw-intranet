import {create} from "zustand";

interface AppState {
    currentModule: AppModuleNames;
    updateCurrentModule: (newModule: AppModuleNames) => void;
    moduleRotation: AppModuleNames[];
    rotationEnabled: boolean;
    rotationInterval: number;
}

export type AppModuleNames = 'welcome' | 'test';

const useAppStoreController = create<AppState>((set) => ({
        currentModule: 'welcome',
        moduleRotation: ['welcome', 'test'],
        updateCurrentModule: (newModule) => set({currentModule: newModule}),
        rotationEnabled: false,
        rotationInterval: 10000,
        rotationTimer: undefined
}));



export default useAppStoreController;
