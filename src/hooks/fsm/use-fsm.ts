import React from "react";
import FSM from "./fsm";
import { InitFSM, StateMap } from "./types";

type FSMState<T, C> = {
    currentState: keyof T;
    context: C;
};

// Define the return type of the useFSM hook
type UseFSMReturnType<T, E, C> = [
    FSMState<T, C>,
    (eventName: E, param?: any) => void
];

function useFSM<T extends StateMap<C>, E extends string, C extends object>(
    initFSM: InitFSM<T, string, C>
): UseFSMReturnType<T, E, C> {
    // Explicitly specify the type of the ref object
    const fsm = React.useRef<FSM<T, string, C> | null>(null);

    // Initialize the FSM instance if it's not already created
    if (!fsm.current) {
        fsm.current = new FSM<T, string, C>(initFSM);
    }

    const [state, setState] = React.useState({
        currentState: fsm.current.getState(),
        context: fsm.current.getContext(),
    });

    const transition = (eventName: E, param?: any) => {
        if (fsm.current) {
            const previousState = fsm.current.getState();
            const previousContext = fsm.current.getContext();

            fsm.current.transition(eventName, param);

            const newState = fsm.current.getState();
            const newContext = fsm.current.getContext();

            // Check if state or context has changed
            if (newState !== previousState || newContext !== previousContext) {
                // If there's no change, do not call setState, hence no re-render
                setState({
                    currentState: newState,
                    context: newContext,
                });
            }
        }
    };

    return [state, transition];
}

export default useFSM;
