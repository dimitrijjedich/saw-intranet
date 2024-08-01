import Loader from "./loader/Loader";

interface ConnectionDisplayProps {
    status: 'Connecting' | 'Open' | 'Closed' | 'Closing' | 'Uninstantiated';
}

export default function ConnectionDisplay(props: ConnectionDisplayProps) {
    return(
        <div>
            {props.status === 'Connecting' && <p>Verbindung zum server wird aufgebaut...</p>}
            {props.status === 'Open' && <p>Verbindung zum server steht!</p>}
            {props.status === 'Closed' && <p>Verbindung zum server wurde getrennt!</p>}

            {props.status === 'Connecting' && <Loader></Loader>}
        </div>
    )
}
