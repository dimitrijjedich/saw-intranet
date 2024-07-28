import { useEffect, useRef } from "react";
import { AppModuleNames, useAppStoreController } from "./utility/AppController";
import { useWebSocketStore } from "./utility/AppWebSocket";
import { getModuleByName, moduleRegestry } from "./modules/ModuleRegistry";
import { useNavigate } from "react-router-dom";

export default function ModuleDisplay() {
    const appController = useAppStoreController();
    const appSocketStore = useWebSocketStore();

    function getCurrentModule(currentModule: string) {
        return getModuleByName(currentModule);
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
    const navigate = useNavigate();
    const optionRef = useRef<HTMLSelectElement>(null);
    const checkBoxRef = useRef<HTMLInputElement>(null);

    function swtichModule(): void {
        if (!checkBoxRef.current?.value) {
            // TODO: Implementieren, dass hier zu einer route navigiert wird, an der für Debugzwecke das Module aus den Queryparametern geladen wird, damit man einfach reloaden kann
            return;
        }
        appController.updateCurrentModule(
            optionRef.current?.value as AppModuleNames
        );
    }

    const appModuleNamesAsArray = Object.keys(moduleRegestry);

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
            <label htmlFor="queryParams">With query params</label>
            <input ref={checkBoxRef} type="checkbox" id="queryParams" />
            <button type={"button"} onClick={swtichModule}>
                Switch Module
            </button>
        </div>
    );
}
