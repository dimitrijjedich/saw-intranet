import ModuleDisplay from "./ModuleDisplay";
import useAppStoreController from "./utility/AppController";

export default function Main() {

    const appController = useAppStoreController();

    return (
        <ModuleDisplay />
    );
}
