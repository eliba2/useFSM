import React from "react";
import useFSM from "../../hooks/fsm/use-fsm";
import "./styles.css";

const TrafficLight: React.FC = () => {
    const intervalCounter = React.useRef(-1);
    const [state, transition] = useFSM({
        states: {
            red: {},
            yellow: {},
            green: {},
            blinkingGreen: {},
        },
        events: {
            next: {
                red: { target: "yellow" },
                yellow: { target: "green" },
                green: { target: "red" },
            },
        },
        initialState: "red",
    });

    React.useEffect(() => {
        intervalCounter.current = window.setTimeout(() => {
            transition("next");
        }, 1000);
        return () => {
            window.clearTimeout(intervalCounter.current);
        };
    }, [transition]);

    const currentLight = state.currentState;

    return (
        <div className="trafficLightPage">
            <label>
                A traffic light. It changes between states using a timer which transits every second..
            </label>
            <div className="trafficContainer">
                <div className="traffic-light">
                    <div className={`light red ${currentLight === "red" ? 'activeLight' : ''}`}></div>
                    <div className={`light yellow ${currentLight === "yellow" ? 'activeLight' : ''}`}></div>
                    <div className={`light green ${currentLight === "green" ? 'activeLight' : ''}`}></div>
                </div>
            </div>
        </div>
    );
};

export default TrafficLight;
