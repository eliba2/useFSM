import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { Panel } from "primereact/panel";
import React from "react";
import "./App.css";
import Properties from "./components/properties";
import SimpleCounter from "./components/simple-counter";
import TrafficLight from "./components/trafficlight";

function App() {
    const [activeComponent, setActiveComponent] =
        React.useState<string>("SimpleCounter");

    const menuItems: MenuItem[] = [
        {
            label: "Examples",
            items: [
                {
                    id: "SimpleCounter",
                    label: "SimpleCounter",
                    command: () => setActiveComponent("SimpleCounter"),
                },
                {
                    id: "TrafficLight",
                    label: "TrafficLight",
                    command: () => setActiveComponent("TrafficLight"),
                },
                {
                    id: "Properties",
                    label: "Properties",
                    command: () => setActiveComponent("Properties"),
                },
            ],
        },
    ];

    const renderComponent = (): JSX.Element => {
        switch (activeComponent) {
            case "SimpleCounter":
                return <SimpleCounter />;
            case "TrafficLight":
                return <TrafficLight />;
            case "Properties":
                return <Properties />;
            default:
                return <div></div>;
        }
    };

    return (
        <div className="App">
            <Panel header="Header" className="topPanel">
                <div className="flex">
                    <div className="w-1/4">
                        <Menu model={menuItems} />
                    </div>
                    <div className="w-3/4">
                        <> {renderComponent()}</>
                    </div>
                </div>
            </Panel>
        </div>
    );
}

export default App;
