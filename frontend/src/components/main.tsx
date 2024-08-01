import { useSearchParams } from "react-router-dom";
import ModuleDisplay from "./modules/ModuleDisplay";
import { useAppStoreController } from "./utility/AppController";
import AppWebSocket from "./utility/AppWebSocket";
import { useEffect } from "react";

export default function Main() {
    const appController = useAppStoreController();
    const [searchParams] = useSearchParams();
    const env = process.env;

    useEffect(() => {
        if (searchParams.get("debug") === "true") {
            appController.setDebugMode(true);
            console.log("%cDebug mode enabled", "color: yellow; font-size: 20px;");
        }
    }, [searchParams]);

    return (
        <AppWebSocket socketUrl={env.REACT_APP_PUBLIC_WEBSOCKET_URL! + env.REACT_APP_PUBLIC_WEBSOCKET_APP_KEY}>
            <ModuleDisplay />
        </AppWebSocket>
    );
}
