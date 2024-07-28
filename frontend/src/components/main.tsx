import ModuleDisplay from "./ModuleDisplay";
import { useAppStoreController } from "./utility/AppController";
import AppWebSocket from "./utility/AppWebSocket";

export default function Main() {
    const appController = useAppStoreController();

    return (
        <AppWebSocket socketUrl="https://echo.websocket.org/">
            <ModuleDisplay />
        </AppWebSocket>
    );
}
