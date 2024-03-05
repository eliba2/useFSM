import React from "react";
import { Button } from "primereact/button";
import useFSM from "../../hooks/fsm/use-fsm";
import "./styles.css";

const SimpleCounter: React.FC = () => {
    const [state, transition] = useFSM({
        states: {
            counting: {},
        },
        events: {
            increase: {
                counting: {
                    target: "counting",
                    action: (context) => {
                        return { ...context, count: context!.count + 1 };
                    },
                },
            },
            decrease: {
                counting: {
                    target: "counting",
                    action: (context) => {
                        return { ...context, count: context!.count - 1 };
                    },
                },
            },
        },
        context: { count: 0 },
        initialState: "counting",
    });
    return (
        <div className="simpleCounter">
            <label>
                A simple counter. Use the buttons to increase and decrease its
                value.
            </label>
            <div className="counterContainer">
                <h2>{state.context.count}</h2>
                <div className="buttons">
                    <Button onClick={() => transition("increase")}>+</Button>
                    <Button onClick={() => transition("decrease")}>-</Button>
                </div>
            </div>
        </div>
    );
};

export default SimpleCounter;
