import { useCurrent } from "../ctx/AppController";

export default function Test() {
    const [currentModule, setCurrentModule] = useCurrent();

    return (
        <>
            <h3>{currentModule}</h3>
        </>
    );
}
