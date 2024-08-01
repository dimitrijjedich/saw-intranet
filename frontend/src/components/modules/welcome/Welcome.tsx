import BaseModuleWrapper from "../../ui/BaseModuleWrapper/BaseModuleWrapper";
import {useAppStoreController} from "../../utility/AppController";
import {useWebSocketStore} from "../../utility/AppWebSocket";
import ConnectionDisplay from "../../ui/ConnectionDisplay";
import Loader from "../../ui/loader/Loader";

export default function Welcome() {
    const socketController = useWebSocketStore();
    const appController = useAppStoreController();

    return (
        <BaseModuleWrapper>
            <div className={'flex flex-gap-large full-h full-w'} style={{justifyContent: 'space-evenly', alignItems: 'center'}}>
                <div>
                    <h1>SW-Intranet</h1>
                    <h5>By Dimi und Moritz</h5>
                </div>
                <div>
                    <ConnectionDisplay status={socketController.status}/>
                </div>
            </div>
        </BaseModuleWrapper>
    );
}
