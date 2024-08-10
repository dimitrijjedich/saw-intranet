import BaseModuleWrapper from "../ui/BaseModuleWrapper/BaseModuleWrapper";
import ModuleDisplay from "../modules/ModuleDisplay";
import './controller.css'
import {useAppStoreController} from "../utility/AppController";
import {moduleRegistry} from "../modules/ModuleRegistry";
import {useEffect, useState} from "react";

export default function Controller() {
    return (
        <BaseModuleWrapper>
            <div className={'flex flex-gap-large full-h full-w padded-large'} style={{justifyContent: 'center'}}>
                <div  style={{flexGrow: 1 }}>
                    <h3>Controller</h3>
                    <p>Use this page to control the modules</p>
                    <ModuleControlInterface />
                </div>
                <div className={'padded-small flex flex-centerize flex-gap-large preview-container'}>
                    <div className={'preview background-blur '}>
                        <ModuleDisplay></ModuleDisplay>
                    </div>
                </div>
            </div>
        </BaseModuleWrapper>
    );
}


function ModuleControlInterface () {
    const appController = useAppStoreController();
    const modules = Object.keys(moduleRegistry);

    const [currentModule, setCurrentModule] = useState(appController.currentModule)

    useEffect(() => {
        setCurrentModule(appController.currentModule)
    }, [appController.currentModule]);

    function handleSelect(event: any) {
        appController.updateCurrentModule(event.target.value);
        // TODO: SEND TO SERVER
    }

    return (
        <div className={'flex flex-column full-w'}>

            <select value={currentModule} onChange={handleSelect} onSelect={handleSelect}>
                {modules.map((moduleName) => (
                    <option key={moduleName} value={moduleName}>
                        {moduleName}
                    </option>
                ))}
            </select>

        </div>
    )
}
