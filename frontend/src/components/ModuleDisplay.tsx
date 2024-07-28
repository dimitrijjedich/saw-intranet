import { useEffect, useRef } from "react";
import SomeOtherTestComponent from "./modules/SomeOtherTestComponent/SomeOtherTestcomponent";
import Welcome from "./modules/welcome/Welcome";
import { AppModuleNames, useAppStoreController } from "./utility/AppController";
import { useWebSocketStore } from "./utility/AppWebSocket";
import { useSearchParams } from "react-router-dom";

export default function ModuleDisplay() {
    const appController = useAppStoreController();

    const appModuleNamesAsArray: AppModuleNames[] = ["welcome", "test"];
    const optionRef = useRef<HTMLSelectElement>(null);

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

    function swtichModule(): void {
        appController.updateCurrentModule(
            optionRef.current?.value as AppModuleNames
        );
    }

    useEffect(() => {
        console.log(appSocketStore.lastMessage);
    }, [appSocketStore.lastMessage]);

    const [searchParams, setSearchParams] = useSearchParams();

    if (searchParams.get("debug") !== "true") return null;

    return (
        <>
            {getCurrentModule(appController.currentModule)}

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
        </>
    );
}
