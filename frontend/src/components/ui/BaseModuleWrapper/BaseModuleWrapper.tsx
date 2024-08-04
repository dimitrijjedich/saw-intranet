import "./baseModuleWrapper.css"

interface BaseModuleWrapperProps {
    children: React.ReactNode;
}

export default function BaseModuleWrapper(props: BaseModuleWrapperProps) {
    //TODO: Implement this https://codesandbox.io/s/cisbc
    return (
        <div className={'module-wrapper'}>
            {props.children}
        </div>
    );
}
