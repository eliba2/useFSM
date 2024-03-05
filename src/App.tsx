import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { Panel } from "primereact/panel";
import React from "react";
import "./App.css";
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
                    id: "FetchData",
                    label: "FetchData",
                    command: () => setActiveComponent("SimpleCounter"),
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
            case "FetchData":
                return <SimpleCounter />;
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
