import Module404 from "./Module404";
import Welcome from "./welcome/Welcome";
import SomeOtherTestComponent from "./SomeOtherTestComponent/SomeOtherTestcomponent";
import {JSX, ReactElement} from "react";

export type ModuleNames = "welcome" | "test" | "404" ;

const moduleRegistry: { [key in ModuleNames]: JSX.Element } = {
    welcome: <Welcome />,
    test: <SomeOtherTestComponent />,
    404: <Module404 />
};

function getModuleByName(name: ModuleNames): ReactElement {
    const module = moduleRegistry[name];
    return module ? module : <Module404 />;
}

export { moduleRegistry, getModuleByName};
