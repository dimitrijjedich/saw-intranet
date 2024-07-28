import { useEffect, useRef } from "react";
import SomeOtherTestComponent from "./modules/SomeOtherTestComponent/SomeOtherTestcomponent";
import Welcome from "./modules/welcome/Welcome";
import { AppModuleNames, useAppStoreController } from "./utility/AppController";
import { useWebSocketStore } from "./utility/AppWebSocket";

export default function ModuleDisplay() {
    const appController = useAppStoreController();
    const appSocketStore = useWebSocketStore();

    function getCurrentModule(currentModule: AppModuleNames) {
        switch (currentModule) {
            case "welcome":
                return <Welcome />;
            case "test":
                return <SomeOtherTestComponent />;
            default:
                return <Welcome />;
        }
    }

    useEffect(() => {
        console.log(appSocketStore.lastMessage);
    }, [appSocketStore.lastMessage]);
    return (
        <>
            {getCurrentModule(appController.currentModule)}
            <ModuleDebugMenu />
        </>
    );
}

function ModuleDebugMenu() {
    const appController = useAppStoreController();
    const optionRef = useRef<HTMLSelectElement>(null);
    const appModuleNamesAsArray: AppModuleNames[] = ["welcome", "test"];

    function swtichModule(): void {
        appController.updateCurrentModule(
            optionRef.current?.value as AppModuleNames
        );
    }

    if (!appController.debugMode) {
        return null;
    }

    return (
        <div
            id="ModuleDebug"
            className="padded-small"
            style={{ position: "absolute", bottom: 0 }}
        >
            <select ref={optionRef}>
                {appModuleNamesAsArray.map((moduleName) => (
                    <option key={moduleName} value={moduleName}>
                        {moduleName}
                    </option>
                ))}
            </select>
            <button type={"button"} onClick={swtichModule}>
                Switch Module
            </button>
        </div>
    );
}
