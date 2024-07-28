import { useEffect, useRef } from "react";
import SomeOtherTestComponent from "./modules/SomeOtherTestComponent/SomeOtherTestcomponent";
import Welcome from "./modules/welcome/Welcome";
import { AppModuleNames, useAppStoreController } from "./utility/AppController";
import { useWebSocketStore } from "./utility/AppWebSocket";

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

    function sendTestMessage(): void {
        appSocketStore.sendMessage!(`Test message sent at ${Date.now()}`);
    }

    useEffect(() => {
        console.log(appSocketStore.lastMessage);
    }, [appSocketStore.lastMessage]);

    return (
        <>
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
            <button onClick={sendTestMessage}>Send Tetsmessage to WS</button>
            {getCurrentModule(appController.currentModule)}
        </>
    );
}
