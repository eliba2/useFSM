import React from "react";
import Markdown from "react-markdown";
import "./styles.css";

const Documentation: React.FC = () => {
    const [readme, setReadme] = React.useState("");

    React.useEffect(() => {
        fetch("/README.md")
            .then((response) => response.text())
            .then((text) => setReadme(text))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="documentation">
            <Markdown>{readme}</Markdown>
        </div>
    );
};

export default Documentation;
