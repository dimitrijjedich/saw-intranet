import { useSearchParams } from "react-router-dom";
import ModuleDisplay from "./ModuleDisplay";
import { useAppStoreController } from "./utility/AppController";
import AppWebSocket from "./utility/AppWebSocket";
import { useEffect } from "react";

export default function Main() {
    const appController = useAppStoreController();

    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get("debug") === "true") {
            appController.setDebugMode(true);
        }
    }, [searchParams]);

    return (
        <AppWebSocket socketUrl="https://echo.websocket.org/">
            <ModuleDisplay />
        </AppWebSocket>
    );
}
