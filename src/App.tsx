import React from "react";
import "./App.css";
import StateComponent from "./components/state-component";

function App() {
    /*
// Usage
const fsm = new FSM({
    states: {
        off: {
            onEnter: () => console.log("entered off"),
        },
        on: {
            onEnter: () => console.log("entered on"),
        },
    },
    events: {
        switch: {
            off: {
                target: "on",
                action: () => console.log("Switching off to on"),
            },
            on: {
                target: "off",
                action: () => console.log("Switching on to off"),
            },
        },
    },
    initialContext: { name: "John" },
    initialState: "on",
});
console.log("Starting state:", fsm.getState());
//console.log(fsm);
fsm.transition("switch");
*/
    //console.log(fsm);
    return (
        <div className="App">
            Hi there
            <StateComponent />
        </div>
    );
}

export default App;
