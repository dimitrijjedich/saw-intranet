import BaseModuleWrapper from "../ui/BaseModuleWrapper/BaseModuleWrapper";

export default function Module404() {
    const blames: string[] = [
        "Vermutlich hat Dimi Schuld 🥴",
        "Moritz ist bestimmt auf der Tastatur eingeschlafen 😴",
        "Vermutlich sind die Echsenmenschen schuld 🦎",
        "Das war bestimmt der Kaffee ☕",
        "Wie hast du das geschafft? 🤔",
        "Sorry, React hat sich verlaufen 🤷‍♂️",
        "Geh und gib Dimi die Schuld 🤬",
        "An dieser Stelle könnte Sebi einen philosophischen Spruch einfügen 🧐",
        "Ein Autohausvergleich von Kai wäre jetzt hilfreich 🚗",
        "JÜPPNEEEEEEEEEER! 🚨",
    ];

    function getRandomBlame() {
        return blames[Math.floor(Math.random() * blames.length)];
    }

    return (
        <BaseModuleWrapper>
            <div className="flex flex-column flex-centerize flex-gap-large full-w full-h">
                <h1>404</h1>
                <div>
                    <p className="text-center">Module not found</p>
                    <p>{getRandomBlame()}</p>
                </div>
            </div>
        </BaseModuleWrapper>
    );
}
