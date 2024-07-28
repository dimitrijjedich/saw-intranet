import Welcome from "./modules/welcome/Welcome";
import useAppStoreController, {AppModuleNames} from "./utility/AppController";

export default function ModuleDisplay () {
    const appController = useAppStoreController();

    function getCurrentModule(currentModule: AppModuleNames) {
        switch (currentModule) {
            case "welcome":
                return <Welcome />;
            default:
                return <Welcome />;
        }
    }

    const startRotation = () => {

    }

    return (
        <>
            <p>{appController.rotationEnabled}</p>
            <button type={'button'} onClick={startRotation}>Start rotation</button>
            {getCurrentModule(appController.currentModule)}
        </>
    );
}
