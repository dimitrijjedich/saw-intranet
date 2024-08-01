import "./loader.css";

export default function Loader() {
    return (
        <div className="loader">
            <div className="loader__circle"></div>
            <div className="loader__circle__trail"></div>
        </div>
    );
}
