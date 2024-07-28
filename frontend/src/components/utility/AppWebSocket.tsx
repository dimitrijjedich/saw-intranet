import { log } from "console";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useWebSocket, { ReadyState, SendMessage } from "react-use-websocket";
import { create } from "zustand";

interface WebSocketProps {
    children: React.ReactNode;
    socketUrl: string;
}

type ConnectionStatus =
    | "Connecting"
    | "Open"
    | "Closing"
    | "Closed"
    | "Uninstantiated";

interface WebSocketStore {
    status: ConnectionStatus;
    setStatus: (status: ConnectionStatus) => void;
    sendMessage?: SendMessage;
    setSendMessage: (sendMessage: SendMessage) => void;
    lastMessage?: MessageEvent<any | null>;
    setLastMessage?: (message: MessageEvent<any | null>) => void;
}

const useWebSocketStore = create<WebSocketStore>((set) => ({
    status: "Connecting",
    setStatus: (status) => set({ status }),
    sendMessage: undefined,
    setSendMessage: (sendMessage) => set({ sendMessage }),
    setLastMessage(message) {
        set({ lastMessage: message });
    },
    lastMessage: undefined,
}));

export default function AppWebSocket(props: WebSocketProps) {
    const [socketUrl, setSocketUrl] = useState(props.socketUrl);
    const webSocketStore = useWebSocketStore();

    // setting up the websocket connection
    const { sendMessage, lastMessage, readyState } = useWebSocket(
        socketUrl,
        {}
    );

    // connect the sendMessage function to the store
    useEffect(() => {
        webSocketStore.setSendMessage!(sendMessage);
    }, []);

    // push the last message to the store
    useEffect(() => {
        if (lastMessage) {
            webSocketStore.setLastMessage!(lastMessage);
        }
    }, [lastMessage]);

    // update the store with the connection status
    useEffect(() => {
        console.log("readyState", connectionStatus as ConnectionStatus);
        webSocketStore.setStatus(connectionStatus as ConnectionStatus);
    }, [readyState]);

    // update the connection status
    const connectionStatus = {
        [ReadyState.CONNECTING]: "Connecting",
        [ReadyState.OPEN]: "Open",
        [ReadyState.CLOSING]: "Closing",
        [ReadyState.CLOSED]: "Closed",
        [ReadyState.UNINSTANTIATED]: "Uninstantiated",
    }[readyState];

    return (
        <>
            <WebSocketDebug />
            {props.children}
        </>
    );
}

function WebSocketDebug() {
    const webSocketStore = useWebSocketStore();

    const [searchParams, setSearchParams] = useSearchParams();

    if (searchParams.get("debug") !== "true") return null;

    return (
        <div
            className="padded-small"
            style={{ position: "absolute", top: "0" }}
        >
            <h5>Socket Debug:</h5>
            <div className="flex flex-gap">
                <div>
                    <span>WebSocket Status: </span>
                    <span
                        style={{
                            color:
                                webSocketStore.status === "Open"
                                    ? "var(--color-positive)"
                                    : "var(color-primary)",
                        }}
                    >
                        {webSocketStore.status}
                    </span>
                </div>
                <div>
                    <span>Last Message data: </span>
                    <span>{webSocketStore.lastMessage?.data ?? ""}</span>
                </div>
            </div>
        </div>
    );
}

export { useWebSocketStore };
