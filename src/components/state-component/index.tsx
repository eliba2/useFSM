import React from "react";
import useFSM from "../../hooks/fsm/use-fsm";

const StateComponent: React.FC = () => {
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
    console.log("state-comp", state);
    return (
        <div>
            {state.context.count}
            <button onClick={() => transition("increase")}>+</button>
            <button onClick={() => transition("decrease")}>-</button>
        </div>
    );
};

export default StateComponent;
