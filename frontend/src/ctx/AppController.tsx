// create a custom hook that is used to access and update a value called CurrentModule which is a string which uses the context

import { createContext, useContext, useState } from "react";

export const AppContext = createContext<string>("");
export const useAppContext = () => useContext(AppContext);

export const AppController = ({ children }: { children: React.ReactNode }) => {
    const [currentModule, setCurrentModule] = useState<string>("test");

    return (
        <AppContext.Provider value={currentModule}>
            {children}
        </AppContext.Provider>
    );
};

export const useCurrent = () => {
    const currentModule = useAppContext();
    const setCurrentModule = useAppContext();

    return [currentModule, setCurrentModule] as const;
};
