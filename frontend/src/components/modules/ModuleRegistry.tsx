import Module404 from "./SomeOtherTestComponent/Module404";
import SomeOtherTestComponent from "./SomeOtherTestComponent/SomeOtherTestcomponent";
import Welcome from "./welcome/Welcome";

const moduleRegestry: { [key: string]: JSX.Element } = {
    welcome: <Welcome />,
    test: <SomeOtherTestComponent />,
    404: <Module404 />,
};

function getModuleByName(name: string): JSX.Element {
    const module = moduleRegestry[name];
    return module ? module : <Module404 />;
}

export { moduleRegestry, getModuleByName };
