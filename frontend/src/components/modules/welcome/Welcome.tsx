import BaseModuleWrapper from "../../ui/BaseModuleWrapper/BaseModuleWrapper";
import {useAppStoreController} from "../../utility/AppController";

export default function Welcome() {
    return (
        <BaseModuleWrapper>
            <div className={'flex flex-gap-large full-h full-w'} style={{justifyContent: 'space-evenly', alignItems: 'center'}}>
                <div>
                    <h1>SW-Intranet</h1>
                    <h5>By Dimi und Moritz</h5>
                </div>
                <div>
                    App wird gestartet

                </div>
            </div>
        </BaseModuleWrapper>
    );
}
