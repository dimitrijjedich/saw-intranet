import "./baseModuleWrapper.css"

interface BaseModuleWrapperProps {
    children: React.ReactNode;
}

export default function BaseModuleWrapper(props: BaseModuleWrapperProps) {
    return (
        <div className={'module-wrapper'}>
            {props.children}
        </div>
    );
}
