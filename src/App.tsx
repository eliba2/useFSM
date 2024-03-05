import React from "react";
import { Divider } from "primereact/divider";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { Panel } from "primereact/panel";
import "./App.css";
import Documentation from "./components/documentation";
import Properties from "./components/properties";
import SimpleCounter from "./components/simple-counter";
import TrafficLight from "./components/trafficlight";

function App() {
    const showComponent = (id: string) => {
        document.getElementById(id)?.scrollIntoView();
    };

    const menuItems: MenuItem[] = [
        {
            label: "Documentation",
            items: [
                {
                    id: "Documentation",
                    label: "Documentation",
                    command: () => showComponent("DocumentationComp"),
                },
            ],
        },
        {
            label: "Examples",
            items: [
                {
                    id: "SimpleCounter",
                    label: "SimpleCounter",
                    command: () => showComponent("SimpleCounterComp"),
                },
                {
                    id: "TrafficLight",
                    label: "TrafficLight",
                    command: () => showComponent("TrafficLightComp"),
                },
                {
                    id: "Properties",
                    label: "Properties",
                    command: () => showComponent("PropertiesComp"),
                },
            ],
        },
    ];

    return (
        <div className="App">
            <Panel header="useFSM" className="topPanel">
                <div className="flex">
                    <div className="w-1/4">
                        <Menu model={menuItems} />
                    </div>
                    <div className="w-3/4">
                        <div id="DocumentationComp">
                            <Documentation />
                        </div>
                        <h1>Examples</h1>
                        <div id="TrafficLightComp">
                            <TrafficLight />
                        </div>
                        <Divider />
                        <div id="SimpleCounterComp">
                            <SimpleCounter />
                        </div>
                        <Divider />
                        <div id="PropertiesComp">
                            <Properties />
                        </div>
                    </div>
                </div>
            </Panel>
        </div>
    );
}

export default App;
