import React, {CSSProperties, JSX, useEffect, useRef} from "react";
import {  useAppStoreController } from "../utility/AppController";
import { useWebSocketStore } from "../utility/AppWebSocket";
import {getModuleByName, ModuleNames, moduleRegistry} from "./ModuleRegistry";
import { useNavigate } from "react-router-dom";
import {animated, AnimatedProps, useSpringRef, useTransition, config} from "@react-spring/web";
import "./moduleDispaly.css"

export default function ModuleDisplay() {
    const appController = useAppStoreController();
    const appSocketStore = useWebSocketStore();

    const transitionRef = useSpringRef();
    const transitions = useTransition(appController.currentModule, {
        ref: transitionRef,
        keys: null,
        from: { Opacity: 0,  transform: "translateY(5%) rotate(1deg)" },
        enter: { Opacity: 1, transform: "translateY(0) rotate(0deg)", delay: 500 },
        leave: { Opacity: 0,  transform: "translateY(-5%) rotate(3deg)" },
        config: { ...config.molasses },
    });

    useEffect(() => {
        transitionRef.start();
    }, [appController.currentModule]);


    function getCurrentModule(currentModule: ModuleNames): JSX.Element {
       return getModuleByName(currentModule);
    }

    return (<>
        <div className={'display-container'}>
            {transitions((styles, i) => {
                return (
                    <animated.div style={{willChange: "opacity, transform", opacity: styles.Opacity, transform: styles.transform}}>
                        {getCurrentModule(i)}
                </animated.div>);
            })}
        </div>
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
            optionRef.current?.value as ModuleNames
        );
    }

    const appModuleNamesAsArray = Object.keys(moduleRegistry);

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
